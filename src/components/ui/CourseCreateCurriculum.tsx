import React, { Dispatch, SetStateAction } from "react";
import { CurriculumSection } from "@/app/addnewcourse/page";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import { Test } from "@/app/addnewcourse/page";
import { MdDelete } from "react-icons/md";
import JoditEditor from "jodit-react";

type CourseCreateCurriculumProps = {
  // setCurrentView: Dispatch<SetStateAction<string>>;
  curriculum: CurriculumSection[];
  setCurriculum: Dispatch<SetStateAction<CurriculumSection[]>>;
};

const CourseCreateCurriculum: React.FC<CourseCreateCurriculumProps> = ({
  // setCurrentView,
  curriculum,
  setCurriculum,
}) => {
  const addSection = () => {
    const newSection: CurriculumSection = {
      sectionId: uuidv4(),
      sectionTitle: "",
      sectionContent: [],
    };

    setCurriculum((prev) => [...prev, newSection]);
  };

  const deleteSection = (sectionId: string) => {
    setCurriculum((prev) =>
      prev.filter((section) => section.sectionId !== sectionId)
    );
  };

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
    );
  };

  const deleteItemFromSection = (sectionId: string, lectureId: string) => {
    setCurriculum((prev) =>
      prev.map((curriculumSection) =>
        curriculumSection.sectionId === sectionId
          ? {
              ...curriculumSection,
              sectionContent: curriculumSection.sectionContent.filter(
                (content) => content.id !== lectureId
              ),
            }
          : curriculumSection
      )
    );
  };

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
    );
  };

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
    );
  };

  const addMCQQuestion = (sectionId: string, testId: string) => {
    setCurriculum((prev) =>
      prev.map((curriculumSection) =>
        curriculumSection.sectionId === sectionId
          ? {
              ...curriculumSection,
              sectionContent: curriculumSection.sectionContent.map((content) =>
                content.type === "test" && content.id === testId
                  ? {
                      ...content,
                      data: {
                        ...content.data,
                        questions: [
                          ...(content.data as Test).questions,
                          {
                            questionId: uuidv4(),
                            questionType: "mcq",
                            mcq: {
                              question: "",
                              options: ["", ""],
                              userAnswer: 0,
                              correctAnswer: -1,
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
    );
  };

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
              sectionContent: curriculumSection.sectionContent.map((content) =>
                content.id === testId
                  ? {
                      ...content,
                      data: {
                        ...content.data,
                        questions: (content.data as Test).questions.filter(
                          (question) => question.questionId !== questionId
                        ),
                      },
                    }
                  : content
              ),
            }
          : curriculumSection
      )
    );
  };

  const addOptionToMCQ = (sectionId: string, testId: string) => {
    setCurriculum((prev) =>
      prev.map((curriculumSection) =>
        curriculumSection.sectionId === sectionId
          ? {
              ...curriculumSection,
              sectionContent: curriculumSection.sectionContent.map((content) =>
                content.type === "test" && content.id === testId
                  ? {
                      ...content,
                      data: {
                        ...content.data,
                        questions: (content.data as Test).questions.map(
                          (question) =>
                            question.questionType === "mcq" && question.mcq
                              ? {
                                  ...question,
                                  mcq: {
                                    ...question.mcq,
                                    options: [...question.mcq.options, ""],
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
    );
  };

  const addDescriptiveQuestion = (sectionId: string, testId: string) => {
    setCurriculum((prev) =>
      prev.map((curriculumSection) =>
        curriculumSection.sectionId === sectionId
          ? {
              ...curriculumSection,
              sectionContent: curriculumSection.sectionContent.map((content) =>
                content.type === "test" && content.id === testId
                  ? {
                      ...content,
                      data: {
                        ...content.data,
                        questions: [
                          ...(content.data as Test).questions,
                          {
                            questionId: uuidv4(),
                            questionType: "descriptive",
                            descriptive: {
                              question: "",
                              userAnswer: "",
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
    );
  };

  return (
    <div className="w-full shadow flex flex-col h-fit rounded-lg">
      <h2 className="text-2xl font-medium p-8 border-b-2">Curriculum</h2>
      <div className="p-8 flex flex-col gap-8">
        <p>
          The curriculum is the heart of your course. Ensure it's
          well-structured, clearly outlining the progression of lectures and
          topics. A detailed curriculum helps learners understand what they'll
          gain, creating transparency and building trust
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
                    <p className="font-medium">Section {index + 1} :</p>
                    <input
                      type="text"
                      name={`section-${curriCulumSection.sectionId}`}
                      id={`section-${curriCulumSection.sectionId}`}
                      placeholder="Section title here"
                      className="border-[1px] border-black/60 rounded-lg px-2 py-2 outline-none lg:w-[40%]"
                    />
                  </span>
                  <button
                    className="text-black hover:text-white hover:bg-red border-[1px] border-black hover:border-red rounded-lg p-2"
                    onClick={() => deleteSection(curriCulumSection.sectionId)}
                  >
                    <MdDelete className="text-2xl" />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {curriCulumSection.sectionContent.map((content, index) => (
                    <span key={content.id}>
                      {content.type === "lecture" && (
                        <span
                          key={content.id}
                          className={`border-[1px] border-black/60 px-4 py-2 rounded-lg w-full flex justify-between`}
                        >
                          <span className="flex gap-2 items-center w-full">
                            <p>{index + 1}. Lecture :</p>
                            <input
                              type="text"
                              name={`content-${content.id}`}
                              id={`content-${content.id}`}
                              placeholder="Lecture title here"
                              className="border-[1px] border-black/60 rounded-lg px-2 py-2 outline-none lg:w-[60%]"
                            />
                          </span>
                          <div className="flex gap-2">
                            <label
                              htmlFor={`lectureUpload-${content.id}`}
                              className="flex gap-2 items-center justify-center text-black hover:text-white hover:bg-gray-600 border-[1px] border-black rounded-lg px-5 py-2 sm:px-4 sm:py-2 w-fit"
                            >
                              <span>Upload</span>
                              <IoCloudUploadOutline className="text-xl" />
                            </label>
                            <input
                              type="file"
                              name={`lectureUpload-${content.id}`}
                              id={`lectureUpload-${content.id}`}
                              className="hidden"
                            />
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
                        </span>
                      )}
                      {content.type === "assignment" && (
                        <span
                          key={content.id}
                          className={`border-[1px] border-black/60 px-4 py-2 rounded-lg w-full flex flex-col gap-6`}
                        >
                          <div className="flex justify-between">
                            <span className="flex gap-2 items-center w-full">
                              <p>{index + 1}. Assignment :</p>
                              <input
                                type="text"
                                name={`content-${content.id}`}
                                id={`content-${content.id}`}
                                placeholder="Assignment title here"
                                className="border-[1px] border-black/60 rounded-lg px-2 py-2 outline-none lg:w-[50%]"
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
                            value=""
                            // onChange={}
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
                              <p>{index + 1}. Test :</p>
                              <input
                                type="text"
                                name={`content-${content.id}`}
                                id={`content-${content.id}`}
                                placeholder="Test title here"
                                className="border-[1px] border-black/60 rounded-lg px-2 py-2 outline-none lg:w-[50%]"
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
                              (content.data as Test).questions.length > 0
                                ? "block"
                                : "hidden"
                            }`}
                          >
                            {(content.data as Test).questions.map(
                              (question, index) =>
                                question.questionType === "mcq" ? (
                                  <div
                                    key={question.questionId}
                                    className="w-full flex flex-col gap-4"
                                  >
                                    <span className="flex flex-col gap-2">
                                      <label htmlFor="question">
                                        Question {index + 1} :
                                      </label>
                                      <div className="flex gap-2 justify-between items-center">
                                        <input
                                          type="text"
                                          name="question"
                                          id="question"
                                          placeholder="Question..."
                                          className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none w-full"
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
                                        Options for question {index + 1} :
                                      </label>
                                      {question.mcq?.options.map(
                                        (option, index) => (
                                          <span className="flex gap-2 items-center">
                                            <input
                                              type="radio"
                                              name="option"
                                              id={`${index}`}
                                              className="w-4 h-4"
                                            />
                                            <input
                                              type="text"
                                              name="option"
                                              id="option"
                                              placeholder={`Option ${
                                                index + 1
                                              }`}
                                              className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
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
                                          content.id
                                        )
                                      }
                                    >
                                      <p>Add Option</p>
                                      <FaPlus />
                                    </button>
                                  </div>
                                ) : (
                                  <div
                                    className="w-full flex flex-col gap-4"
                                    key={question.questionId}
                                  >
                                    <span className="flex flex-col gap-2">
                                      <label htmlFor="question">
                                        Question {index + 1} :
                                      </label>
                                      <div className="flex gap-2 justify-between items-center">
                                        <input
                                          type="text"
                                          name="question"
                                          id="question"
                                          placeholder="Question..."
                                          className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none w-full"
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
                                        Question {index + 1} Expected answer:
                                      </label>
                                      <textarea
                                        name="question"
                                        id="question"
                                        placeholder="Question..."
                                        cols={3}
                                        className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
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
                              <p>Descriptive</p>
                              <FaPlus />
                            </button>
                          </span>
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <span className="flex gap-4">
                  <button
                    className="flex gap-2 items-center justify-center text-black hover:text-white hover:bg-gray-600 border-[1px] border-black rounded-lg px-5 py-2 sm:px-4 sm:py-2 w-fit"
                    onClick={() =>
                      addLectureToSection(curriCulumSection.sectionId)
                    }
                  >
                    <p>Lecture</p>
                    <FaPlus />
                  </button>
                  <button
                    className="flex gap-2 items-center justify-center text-black hover:text-white hover:bg-gray-600 border-[1px] border-black rounded-lg px-5 py-2 sm:px-4 sm:py-2 w-fit"
                    onClick={() =>
                      addAssignmentToSection(curriCulumSection.sectionId)
                    }
                  >
                    <p>Assignment</p>
                    <FaPlus />
                  </button>
                  <button
                    className="flex gap-2 items-center justify-center text-black hover:text-white hover:bg-gray-600 border-[1px] border-black rounded-lg px-5 py-2 sm:px-4 sm:py-2 w-fit"
                    onClick={() =>
                      addTestToSection(curriCulumSection.sectionId)
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
        <button className="text-black hover:text-white hover:bg-blue border-2 border-blue rounded-full px-5 py-2 sm:px-4 sm:py-2 w-fit mx-auto">
          <p>Save Changes</p>
        </button>
      </div>
    </div>
  );
};

export default CourseCreateCurriculum;
