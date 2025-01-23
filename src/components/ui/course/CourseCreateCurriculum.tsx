import React, {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from "react"
import {
    Assignment,
    CurriculumSection,
    Descriptive,
    Lecture,
    Mcq,
} from "@/app/addnewcourse/page"
import { IoCloudUploadOutline } from "react-icons/io5"
import { FaPlus } from "react-icons/fa6"
import { v4 as uuidv4 } from "uuid"
import { Test } from "@/app/addnewcourse/page"
import { MdDelete } from "react-icons/md"
import dynamic from "next/dynamic"
import { uploadFileToAWS } from "@/lib/awsUtil"
import { deleteFromBucket } from "@/actions/aws"
import { submitCourseCurriculum } from "@/actions/actions"

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false })

type CourseCreateCurriculumProps = {
    curriculum: CurriculumSection[]
    setCurriculum: Dispatch<SetStateAction<CurriculumSection[]>>
    setView: Dispatch<SetStateAction<string>>
}

const CourseCreateCurriculum: React.FC<CourseCreateCurriculumProps> = ({
    curriculum,
    setCurriculum,
    setView,
}) => {
    const addSection = () => {
        const newSection: CurriculumSection = {
            sectionId: uuidv4(),
            sectionTitle: "",
            sectionContent: [],
        }

        setCurriculum((prev) => [...prev, newSection])
    }

    const deleteSection = (sectionId: string) => {
        setCurriculum((prev) =>
            prev.filter((section) => section.sectionId !== sectionId)
        )
    }

    const addLectureToSection = (sectionId: string) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent: [
                              ...curriculumSection.sectionContent,
                              {
                                  type: "lecture",
                                  id: uuidv4(),
                                  data: {
                                      lectureTitle: "",
                                      content: "",
                                  },
                              },
                          ],
                      }
                    : curriculumSection
            )
        )
    }

    const deleteItemFromSection = (sectionId: string, lectureId: string) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent:
                              curriculumSection.sectionContent.filter(
                                  (content) => content.id !== lectureId
                              ),
                      }
                    : curriculumSection
            )
        )
    }

    const addAssignmentToSection = (sectionId: string) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent: [
                              ...curriculumSection.sectionContent,
                              {
                                  type: "assignment",
                                  id: uuidv4(),
                                  data: {
                                      assignmentTitle: "",
                                      content: "",
                                  },
                              },
                          ],
                      }
                    : curriculumSection
            )
        )
    }

    const addTestToSection = (sectionId: string) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent: [
                              ...curriculumSection.sectionContent,
                              {
                                  type: "test",
                                  id: uuidv4(),
                                  data: {
                                      title: "",
                                      questions: [],
                                  },
                              },
                          ],
                      }
                    : curriculumSection
            )
        )
    }

    const addMCQQuestion = (sectionId: string, testId: string) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent: curriculumSection.sectionContent.map(
                              (content) =>
                                  content.type === "test" &&
                                  content.id === testId
                                      ? {
                                            ...content,
                                            data: {
                                                ...content.data,
                                                questions: [
                                                    ...(content.data as Test)
                                                        .questions,
                                                    {
                                                        questionId: uuidv4(),
                                                        questionType: "mcq",
                                                        question: {
                                                            title: "",
                                                            options: ["", ""],
                                                            correctAnswer: 0,
                                                        },
                                                    },
                                                ],
                                            },
                                        }
                                      : content
                          ),
                      }
                    : curriculumSection
            )
        )
    }

    const deleteQuestion = (
        sectionId: string,
        testId: string,
        questionId: string
    ) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent: curriculumSection.sectionContent.map(
                              (content) =>
                                  content.id === testId
                                      ? {
                                            ...content,
                                            data: {
                                                ...content.data,
                                                questions: (
                                                    content.data as Test
                                                ).questions.filter(
                                                    (question) =>
                                                        question.questionId !==
                                                        questionId
                                                ),
                                            },
                                        }
                                      : content
                          ),
                      }
                    : curriculumSection
            )
        )
    }

    const addOptionToMCQ = (
        sectionId: string,
        testId: string,
        questionId: string
    ) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent: curriculumSection.sectionContent.map(
                              (content) =>
                                  content.type === "test" &&
                                  content.id === testId
                                      ? {
                                            ...content,
                                            data: {
                                                ...content.data,
                                                questions: (
                                                    content.data as Test
                                                ).questions.map((question) =>
                                                    question.questionId ===
                                                    questionId
                                                        ? {
                                                              ...question,
                                                              question: {
                                                                  ...(question.question as Mcq),
                                                                  options: [
                                                                      ...(
                                                                          question.question as Mcq
                                                                      ).options,
                                                                      "",
                                                                  ],
                                                              },
                                                          }
                                                        : question
                                                ),
                                            },
                                        }
                                      : content
                          ),
                      }
                    : curriculumSection
            )
        )
    }

    const addDescriptiveQuestion = (sectionId: string, testId: string) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent: curriculumSection.sectionContent.map(
                              (content) =>
                                  content.type === "test" &&
                                  content.id === testId
                                      ? {
                                            ...content,
                                            data: {
                                                ...content.data,
                                                questions: [
                                                    ...(content.data as Test)
                                                        .questions,
                                                    {
                                                        questionId: uuidv4(),
                                                        questionType:
                                                            "descriptive",
                                                        question: {
                                                            title: "",
                                                            correctAnswer: "",
                                                        },
                                                    },
                                                ],
                                            },
                                        }
                                      : content
                          ),
                      }
                    : curriculumSection
            )
        )
    }

    // State managements
    const changeSectionTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === e.target.id
                    ? {
                          ...curriculumSection,
                          sectionTitle: e.target.value,
                      }
                    : curriculumSection
            )
        )
    }

    const changeLectureTitle = (
        sectionId: string,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent: curriculumSection.sectionContent.map(
                              (content) =>
                                  content.id === e.target.id
                                      ? {
                                            ...content,
                                            data: {
                                                ...content.data,
                                                lectureTitle: e.target.value,
                                            },
                                        }
                                      : content
                          ),
                      }
                    : curriculumSection
            )
        )
    }

    const changeLectureContent = async (
        sectionId: string,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        try {
            if (e.target.files && e.target.files[0]) {
                const video = e.target.files[0]
                console.log(video)
                const videoUrl = await uploadFileToAWS(video)
                console.log(videoUrl)
                if (videoUrl !== null) {
                    setCurriculum((prev) =>
                        prev.map((curriculumSection) =>
                            curriculumSection.sectionId === sectionId
                                ? {
                                      ...curriculumSection,
                                      sectionContent:
                                          curriculumSection.sectionContent.map(
                                              (content) =>
                                                  content.id ===
                                                  e.target.id.replace(
                                                      "lectureUpload-",
                                                      ""
                                                  )
                                                      ? {
                                                            ...content,
                                                            data: {
                                                                ...content.data,
                                                                content:
                                                                    videoUrl,
                                                            },
                                                        }
                                                      : content
                                          ),
                                  }
                                : curriculumSection
                        )
                    )
                    console.log(
                        "Video URL uploaded and curriculum updated successfully."
                    )
                }
            }
        } catch (error) {
            console.error("Error updating lecture content:", error)
        }
    }

    const changeAssignmentTitle = (
        sectionId: string,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent: curriculumSection.sectionContent.map(
                              (content) =>
                                  content.id === e.target.id
                                      ? {
                                            ...content,
                                            data: {
                                                ...content.data,
                                                assignmentTitle: e.target.value,
                                            },
                                        }
                                      : content
                          ),
                      }
                    : curriculumSection
            )
        )
    }

    const changeAssignmentDescription = (
        sectionId: string,
        contentId: string,
        newValue: string
    ) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent: curriculumSection.sectionContent.map(
                              (content) =>
                                  content.id === contentId
                                      ? {
                                            ...content,
                                            data: {
                                                ...content.data,
                                                content: newValue,
                                            },
                                        }
                                      : content
                          ),
                      }
                    : curriculumSection
            )
        )
    }

    const changeTestTitle = (
        sectionId: string,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent: curriculumSection.sectionContent.map(
                              (content) =>
                                  content.id === e.target.id
                                      ? {
                                            ...content,
                                            data: {
                                                ...content.data,
                                                title: e.target.value,
                                            },
                                        }
                                      : content
                          ),
                      }
                    : curriculumSection
            )
        )
    }

    const changeMCQQuestionTitle = (
        sectionId: string,
        contentId: string,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent: curriculumSection.sectionContent.map(
                              (content) =>
                                  content.id === contentId
                                      ? {
                                            ...content,
                                            data: {
                                                ...(content.data as Test),
                                                questions: (
                                                    content.data as Test
                                                ).questions.map((question) =>
                                                    question.questionId ===
                                                    e.target.id
                                                        ? {
                                                              ...question,
                                                              question: {
                                                                  ...(question.question as Mcq),
                                                                  title: e
                                                                      .target
                                                                      .value,
                                                              },
                                                          }
                                                        : question
                                                ),
                                            },
                                        }
                                      : content
                          ),
                      }
                    : curriculumSection
            )
        )
    }

    const changeMCQOptionValue = (
        sectionId: string,
        contentId: string,
        questionId: string,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent: curriculumSection.sectionContent.map(
                              (content) =>
                                  content.id === contentId
                                      ? {
                                            ...content,
                                            data: {
                                                ...(content.data as Test),
                                                questions: (
                                                    content.data as Test
                                                ).questions.map((question) =>
                                                    question.questionId ===
                                                    questionId
                                                        ? {
                                                              ...question,
                                                              question: {
                                                                  ...(question.question as Mcq),
                                                                  options: (
                                                                      question.question as Mcq
                                                                  ).options.map(
                                                                      (
                                                                          option,
                                                                          index
                                                                      ) =>
                                                                          index ===
                                                                          parseInt(
                                                                              e
                                                                                  .target
                                                                                  .id
                                                                          )
                                                                              ? e
                                                                                    .target
                                                                                    .value
                                                                              : option
                                                                  ),
                                                              },
                                                          }
                                                        : question
                                                ),
                                            },
                                        }
                                      : content
                          ),
                      }
                    : curriculumSection
            )
        )
    }

    const changeMcqCorrectAnswer = (
        sectionId: string,
        contentId: string,
        questionId: string,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent: curriculumSection.sectionContent.map(
                              (content) =>
                                  content.id === contentId
                                      ? {
                                            ...content,
                                            data: {
                                                ...(content.data as Test),
                                                questions: (
                                                    content.data as Test
                                                ).questions.map((question) =>
                                                    question.questionId ===
                                                    questionId
                                                        ? {
                                                              ...question,
                                                              question: {
                                                                  ...(question.question as Mcq),
                                                                  correctAnswer:
                                                                      parseInt(
                                                                          e
                                                                              .target
                                                                              .id
                                                                      ),
                                                              },
                                                          }
                                                        : question
                                                ),
                                            },
                                        }
                                      : content
                          ),
                      }
                    : curriculumSection
            )
        )
    }

    const changeDescriptiveQuestionTitle = (
        sectionId: string,
        contentId: string,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent: curriculumSection.sectionContent.map(
                              (content) =>
                                  content.id === contentId
                                      ? {
                                            ...content,
                                            data: {
                                                ...(content.data as Test),
                                                questions: (
                                                    content.data as Test
                                                ).questions.map((question) =>
                                                    question.questionId ===
                                                    e.target.id
                                                        ? {
                                                              ...question,
                                                              question: {
                                                                  ...(question.question as Descriptive),
                                                                  title: e
                                                                      .target
                                                                      .value,
                                                              },
                                                          }
                                                        : question
                                                ),
                                            },
                                        }
                                      : content
                          ),
                      }
                    : curriculumSection
            )
        )
    }

    const changeDescriptiveExpectedAnswer = (
        sectionId: string,
        contentId: string,
        e: ChangeEvent<HTMLTextAreaElement>
    ) => {
        setCurriculum((prev) =>
            prev.map((curriculumSection) =>
                curriculumSection.sectionId === sectionId
                    ? {
                          ...curriculumSection,
                          sectionContent: curriculumSection.sectionContent.map(
                              (content) =>
                                  content.id === contentId
                                      ? {
                                            ...content,
                                            data: {
                                                ...(content.data as Test),
                                                questions: (
                                                    content.data as Test
                                                ).questions.map((question) =>
                                                    question.questionId ===
                                                    e.target.id
                                                        ? {
                                                              ...question,
                                                              question: {
                                                                  ...(question.question as Descriptive),
                                                                  correctAnswer:
                                                                      e.target
                                                                          .value,
                                                              },
                                                          }
                                                        : question
                                                ),
                                            },
                                        }
                                      : content
                          ),
                      }
                    : curriculumSection
            )
        )
    }
    //   Deleting files from the aws
    const handleDeleteFile = async (url: string) => {
        if (url) {
            await deleteFromBucket(url)
        }
    }
    const handleSubmission = async () => {
        try {
            console.log(curriculum)
            setView("Pricing")
        } catch (error) {
            console.error("Error creating Curriculum: ", error)
        }
    }
    return (
        <div className="w-full shadow flex flex-col h-fit rounded-lg">
            <h2 className="text-2xl font-medium p-8 border-b-2">Curriculum</h2>
            <div className="p-8 flex flex-col gap-8">
                <p>
                    The curriculum is the heart of your course. Ensure it's
                    well-structured, clearly outlining the progression of
                    lectures and topics. A detailed curriculum helps learners
                    understand what they'll gain, creating transparency and
                    building trust
                </p>
                <div className="flex flex-col gap-6">
                    {curriculum.map((curriCulumSection, index) => (
                        <div
                            className="flex flex-col w-full gap-2 p-4 border-2 border-black/60 rounded-lg"
                            key={curriCulumSection.sectionId}
                        >
                            <div className="flex flex-col gap-6">
                                <div className="flex justify-between">
                                    <span className="flex gap-2 items-center w-full">
                                        <p className="font-medium">
                                            Section {index + 1} :
                                        </p>
                                        <input
                                            type="text"
                                            name={curriCulumSection.sectionId}
                                            id={curriCulumSection.sectionId}
                                            placeholder="Section title here"
                                            className="border-[1px] border-black/60 rounded-lg px-2 py-2 outline-none lg:w-[40%]"
                                            value={
                                                curriCulumSection.sectionTitle
                                            }
                                            onChange={changeSectionTitle}
                                        />
                                    </span>
                                    <button
                                        className="text-black hover:text-white hover:bg-red border-[1px] border-black hover:border-red rounded-lg p-2"
                                        onClick={() =>
                                            deleteSection(
                                                curriCulumSection.sectionId
                                            )
                                        }
                                    >
                                        <MdDelete className="text-2xl" />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {curriCulumSection.sectionContent.map(
                                        (content, index) => (
                                            <span key={content.id}>
                                                {content.type === "lecture" && (
                                                    <span
                                                        key={content.id}
                                                        className={`border-[1px] border-black/60 px-4 py-2 rounded-lg w-full flex justify-between`}
                                                    >
                                                        <span className="flex gap-2 items-center w-full">
                                                            <p>
                                                                {index + 1}.
                                                                Lecture :
                                                            </p>
                                                            <input
                                                                type="text"
                                                                name={
                                                                    content.id
                                                                }
                                                                id={content.id}
                                                                placeholder="Lecture title here"
                                                                className="border-[1px] border-black/60 rounded-lg px-2 py-2 outline-none lg:w-[60%]"
                                                                value={
                                                                    (
                                                                        content.data as Lecture
                                                                    )
                                                                        .lectureTitle
                                                                }
                                                                onChange={(e) =>
                                                                    changeLectureTitle(
                                                                        curriCulumSection.sectionId,
                                                                        e
                                                                    )
                                                                }
                                                            />
                                                        </span>
                                                        <div className="flex gap-2">
                                                            <label
                                                                htmlFor={`lectureUpload-${content.id}`}
                                                                className=" cursor-pointer flex gap-2 items-center justify-center text-black hover:text-white hover:bg-gray-600 border-[1px] border-black rounded-lg px-5 py-2 sm:px-4 sm:py-2 w-fit"
                                                            >
                                                                <span>
                                                                    Upload
                                                                </span>
                                                                <IoCloudUploadOutline className="text-xl" />
                                                            </label>
                                                            <input
                                                                type="file"
                                                                name={`lectureUpload-${content.id}`}
                                                                id={`lectureUpload-${content.id}`}
                                                                className="hidden"
                                                                onChange={(e) =>
                                                                    changeLectureContent(
                                                                        curriCulumSection.sectionId,
                                                                        e
                                                                    )
                                                                }
                                                            />
                                                            <button
                                                                className="text-black hover:text-white hover:bg-red border-[1px] border-black hover:border-red rounded-lg p-2"
                                                                onClick={() => {
                                                                    handleDeleteFile(
                                                                        (
                                                                            content.data as Lecture
                                                                        )
                                                                            .content
                                                                    )
                                                                    deleteItemFromSection(
                                                                        curriCulumSection.sectionId,
                                                                        content.id
                                                                    )
                                                                }}
                                                            >
                                                                <MdDelete className="text-2xl" />
                                                            </button>
                                                        </div>
                                                    </span>
                                                )}
                                                {content.type ===
                                                    "assignment" && (
                                                    <span
                                                        key={content.id}
                                                        className={`border-[1px] border-black/60 px-4 py-2 rounded-lg w-full flex flex-col gap-6`}
                                                    >
                                                        <div className="flex justify-between">
                                                            <span className="flex gap-2 items-center w-full">
                                                                <p>
                                                                    {index + 1}.
                                                                    Assignment :
                                                                </p>
                                                                <input
                                                                    type="text"
                                                                    name={
                                                                        content.id
                                                                    }
                                                                    id={
                                                                        content.id
                                                                    }
                                                                    placeholder="Assignment title here"
                                                                    className="border-[1px] border-black/60 rounded-lg px-2 py-2 outline-none lg:w-[50%]"
                                                                    value={
                                                                        (
                                                                            content.data as Assignment
                                                                        )
                                                                            .assignmentTitle
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        changeAssignmentTitle(
                                                                            curriCulumSection.sectionId,
                                                                            e
                                                                        )
                                                                    }
                                                                />
                                                            </span>
                                                            <button
                                                                className="text-black hover:text-white hover:bg-red border-[1px] border-black hover:border-red rounded-lg p-2"
                                                                onClick={() =>
                                                                    deleteItemFromSection(
                                                                        curriCulumSection.sectionId,
                                                                        content.id
                                                                    )
                                                                }
                                                            >
                                                                <MdDelete className="text-2xl" />
                                                            </button>
                                                        </div>
                                                        <JoditEditor
                                                            value={
                                                                (
                                                                    content.data as Assignment
                                                                ).content
                                                            }
                                                            onChange={(
                                                                newContent
                                                            ) =>
                                                                changeAssignmentDescription(
                                                                    curriCulumSection.sectionId,
                                                                    content.id,
                                                                    newContent
                                                                )
                                                            }
                                                        />
                                                    </span>
                                                )}
                                                {content.type === "test" && (
                                                    <span
                                                        key={content.id}
                                                        className={`border-[1px] border-black/60 px-4 py-2 rounded-lg w-full flex flex-col gap-6`}
                                                    >
                                                        <div className="flex justify-between">
                                                            <span className="flex gap-2 items-center w-full">
                                                                <p>
                                                                    {index + 1}.
                                                                    Test :
                                                                </p>
                                                                <input
                                                                    type="text"
                                                                    name={
                                                                        content.id
                                                                    }
                                                                    id={
                                                                        content.id
                                                                    }
                                                                    placeholder="Test title here"
                                                                    className="border-[1px] border-black/60 rounded-lg px-2 py-2 outline-none lg:w-[50%]"
                                                                    value={
                                                                        (
                                                                            content.data as Test
                                                                        ).title
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        changeTestTitle(
                                                                            curriCulumSection.sectionId,
                                                                            e
                                                                        )
                                                                    }
                                                                />
                                                            </span>
                                                            <button
                                                                className="text-black hover:text-white hover:bg-red border-[1px] border-black hover:border-red rounded-lg p-2"
                                                                onClick={() =>
                                                                    deleteItemFromSection(
                                                                        curriCulumSection.sectionId,
                                                                        content.id
                                                                    )
                                                                }
                                                            >
                                                                <MdDelete className="text-2xl" />
                                                            </button>
                                                        </div>
                                                        <div
                                                            className={`flex flex-col gap-8 ${
                                                                (
                                                                    content.data as Test
                                                                ).questions
                                                                    .length > 0
                                                                    ? "block"
                                                                    : "hidden"
                                                            }`}
                                                        >
                                                            {(
                                                                content.data as Test
                                                            ).questions.map(
                                                                (
                                                                    question,
                                                                    index
                                                                ) =>
                                                                    question.questionType ===
                                                                    "mcq" ? (
                                                                        <div
                                                                            key={
                                                                                question.questionId
                                                                            }
                                                                            className="w-full flex flex-col gap-4"
                                                                        >
                                                                            <span className="flex flex-col gap-2">
                                                                                <label htmlFor="question">
                                                                                    Question{" "}
                                                                                    {index +
                                                                                        1}{" "}
                                                                                    :
                                                                                </label>
                                                                                <div className="flex gap-2 justify-between items-center">
                                                                                    <input
                                                                                        type="text"
                                                                                        name="question"
                                                                                        id={
                                                                                            question.questionId
                                                                                        }
                                                                                        placeholder="Question..."
                                                                                        className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none w-full"
                                                                                        value={
                                                                                            (
                                                                                                question.question as Mcq
                                                                                            )
                                                                                                .title
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) =>
                                                                                            changeMCQQuestionTitle(
                                                                                                curriCulumSection.sectionId,
                                                                                                content.id,
                                                                                                e
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                    <button
                                                                                        className="text-black hover:text-white hover:bg-red border-[1px] border-black hover:border-red rounded-lg p-2 h-fit"
                                                                                        onClick={() =>
                                                                                            deleteQuestion(
                                                                                                curriCulumSection.sectionId,
                                                                                                content.id,
                                                                                                question.questionId
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <MdDelete className="text-2xl" />
                                                                                    </button>
                                                                                </div>
                                                                            </span>
                                                                            <span className="flex flex-col gap-2">
                                                                                <label htmlFor="question">
                                                                                    Options
                                                                                    for
                                                                                    question{" "}
                                                                                    {index +
                                                                                        1}{" "}
                                                                                    :
                                                                                </label>
                                                                                {(
                                                                                    question.question as Mcq
                                                                                ).options.map(
                                                                                    (
                                                                                        option,
                                                                                        index
                                                                                    ) => (
                                                                                        <span
                                                                                            className="flex gap-2 items-center"
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                        >
                                                                                            <input
                                                                                                type="radio"
                                                                                                name="option"
                                                                                                id={`${index}`}
                                                                                                className="w-4 h-4"
                                                                                                checked={
                                                                                                    index ===
                                                                                                    (
                                                                                                        question.question as Mcq
                                                                                                    )
                                                                                                        .correctAnswer
                                                                                                }
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    changeMcqCorrectAnswer(
                                                                                                        curriCulumSection.sectionId,
                                                                                                        content.id,
                                                                                                        question.questionId,
                                                                                                        e
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                            <input
                                                                                                type="text"
                                                                                                name="option"
                                                                                                id={`${index}`}
                                                                                                placeholder={`Option ${
                                                                                                    index +
                                                                                                    1
                                                                                                }`}
                                                                                                className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
                                                                                                value={
                                                                                                    option
                                                                                                }
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    changeMCQOptionValue(
                                                                                                        curriCulumSection.sectionId,
                                                                                                        content.id,
                                                                                                        question.questionId,
                                                                                                        e
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </span>
                                                                                    )
                                                                                )}
                                                                            </span>
                                                                            <button
                                                                                className="flex gap-2 items-center justify-center text-black hover:text-white hover:bg-gray-600 border-[1px] border-black rounded-lg px-5 py-2 sm:px-4 sm:py-2 w-fit"
                                                                                onClick={() =>
                                                                                    addOptionToMCQ(
                                                                                        curriCulumSection.sectionId,
                                                                                        content.id,
                                                                                        question.questionId
                                                                                    )
                                                                                }
                                                                            >
                                                                                <p>
                                                                                    Add
                                                                                    Option
                                                                                </p>
                                                                                <FaPlus />
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <div
                                                                            className="w-full flex flex-col gap-4"
                                                                            key={
                                                                                question.questionId
                                                                            }
                                                                        >
                                                                            <span className="flex flex-col gap-2">
                                                                                <label htmlFor="question">
                                                                                    Question{" "}
                                                                                    {index +
                                                                                        1}{" "}
                                                                                    :
                                                                                </label>
                                                                                <div className="flex gap-2 justify-between items-center">
                                                                                    <input
                                                                                        type="text"
                                                                                        name="question"
                                                                                        id={
                                                                                            question.questionId
                                                                                        }
                                                                                        placeholder="Question..."
                                                                                        className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none w-full"
                                                                                        value={
                                                                                            (
                                                                                                question.question as Descriptive
                                                                                            )
                                                                                                .title
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) =>
                                                                                            changeDescriptiveQuestionTitle(
                                                                                                curriCulumSection.sectionId,
                                                                                                content.id,
                                                                                                e
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                    <button
                                                                                        className="text-black hover:text-white hover:bg-red border-[1px] border-black hover:border-red rounded-lg p-2 h-fit"
                                                                                        onClick={() =>
                                                                                            deleteQuestion(
                                                                                                curriCulumSection.sectionId,
                                                                                                content.id,
                                                                                                question.questionId
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <MdDelete className="text-2xl" />
                                                                                    </button>
                                                                                </div>
                                                                            </span>
                                                                            <span className="flex flex-col gap-2">
                                                                                <label htmlFor="question">
                                                                                    Question{" "}
                                                                                    {index +
                                                                                        1}{" "}
                                                                                    Expected
                                                                                    answer:
                                                                                </label>
                                                                                <textarea
                                                                                    name="question"
                                                                                    id={
                                                                                        question.questionId
                                                                                    }
                                                                                    placeholder="Question..."
                                                                                    cols={
                                                                                        3
                                                                                    }
                                                                                    className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
                                                                                    value={
                                                                                        (
                                                                                            question.question as Descriptive
                                                                                        )
                                                                                            .correctAnswer
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        changeDescriptiveExpectedAnswer(
                                                                                            curriCulumSection.sectionId,
                                                                                            content.id,
                                                                                            e
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </span>
                                                                        </div>
                                                                    )
                                                            )}
                                                        </div>
                                                        <span className="flex gap-4">
                                                            <button
                                                                className="flex gap-2 items-center justify-center text-black hover:text-white hover:bg-gray-600 border-[1px] border-black rounded-lg px-5 py-2 sm:px-4 sm:py-2 w-fit"
                                                                onClick={() =>
                                                                    addMCQQuestion(
                                                                        curriCulumSection.sectionId,
                                                                        content.id
                                                                    )
                                                                }
                                                            >
                                                                <p>MCQ</p>
                                                                <FaPlus />
                                                            </button>
                                                            <button
                                                                className="flex gap-2 items-center justify-center text-black hover:text-white hover:bg-gray-600 border-[1px] border-black rounded-lg px-5 py-2 sm:px-4 sm:py-2 w-fit"
                                                                onClick={() =>
                                                                    addDescriptiveQuestion(
                                                                        curriCulumSection.sectionId,
                                                                        content.id
                                                                    )
                                                                }
                                                            >
                                                                <p>
                                                                    Descriptive
                                                                </p>
                                                                <FaPlus />
                                                            </button>
                                                        </span>
                                                    </span>
                                                )}
                                            </span>
                                        )
                                    )}
                                </div>
                                <span className="flex gap-4">
                                    <button
                                        className="flex gap-2 items-center justify-center text-black hover:text-white hover:bg-gray-600 border-[1px] border-black rounded-lg px-5 py-2 sm:px-4 sm:py-2 w-fit"
                                        onClick={() =>
                                            addLectureToSection(
                                                curriCulumSection.sectionId
                                            )
                                        }
                                    >
                                        <p>Lecture</p>
                                        <FaPlus />
                                    </button>
                                    <button
                                        className="flex gap-2 items-center justify-center text-black hover:text-white hover:bg-gray-600 border-[1px] border-black rounded-lg px-5 py-2 sm:px-4 sm:py-2 w-fit"
                                        onClick={() =>
                                            addAssignmentToSection(
                                                curriCulumSection.sectionId
                                            )
                                        }
                                    >
                                        <p>Assignment</p>
                                        <FaPlus />
                                    </button>
                                    <button
                                        className="flex gap-2 items-center justify-center text-black hover:text-white hover:bg-gray-600 border-[1px] border-black rounded-lg px-5 py-2 sm:px-4 sm:py-2 w-fit"
                                        onClick={() =>
                                            addTestToSection(
                                                curriCulumSection.sectionId
                                            )
                                        }
                                    >
                                        <p>Test</p>
                                        <FaPlus />
                                    </button>
                                </span>
                            </div>
                        </div>
                    ))}
                    <button
                        className="flex gap-2 items-center justify-center text-black hover:text-white hover:bg-gray-600 border-2 border-black rounded-lg px-5 py-2 sm:px-4 sm:py-2 w-fit"
                        onClick={addSection}
                    >
                        <p>Add Section</p>
                        <FaPlus />
                    </button>
                </div>
                <button
                    className="text-black hover:text-white hover:bg-blue border-2 border-blue rounded-full px-5 py-2 sm:px-4 sm:py-2 w-fit mx-auto"
                    onClick={handleSubmission}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default CourseCreateCurriculum
