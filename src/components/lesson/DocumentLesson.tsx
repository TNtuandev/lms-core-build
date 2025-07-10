interface IDocumentLessonProps {
  data: any;
}

export default function DocumentLesson({data}: IDocumentLessonProps) {
  return(
    <div className="md:mx-20 mx-4 h-[60vh] overflow-auto">
      <h1 className="text-2xl font-bold mb-4">{data?.title}</h1>
      <p className="text-gray-700">
        {data?.description}
      </p>
    </div>
  )
}