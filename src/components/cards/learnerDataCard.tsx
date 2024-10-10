type LearnerData = {
  number: number;
  domain: String;
};

export function LearnerDataCard(props: LearnerData) {
  return (
    <div className="custom-shadow bg-white rounded-2xl text-center flex flex-col gap-3 pt-3 border-2 min-w-52">
      <span>
        <h3 className="text-2xl lg:text-3xl font-semibold">{props.number}M+</h3>
        <p className="text-lg font-sans">Learners</p>
      </span>
      <p className="px-4 py-3 border-t-2">{props.domain}</p>
    </div>
  );
}
