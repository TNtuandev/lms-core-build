export default function DocumentLesson() {
  return(
    <div className="md:mx-20 mx-4 h-[60vh] overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Xây dựng chân dung người dùng (Persona)</h1>
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item}>
          <div className="font-semibold mb-2">Lorem ipsum</div>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet consectetur. Risus purus duis interdum sem volutpat donec. Nec id quam sed elit viverra enim orci aliquam. Rhoncus erat pellentesque id pellentesque pulvinar laoreet nunc magna molestie. At in habitant sit nisl mauris vulputate quis lorem fames. Vitae nunc volutpat adipiscing sagittis ultricies diam mi neque.
          </p>
        </div>
      ))}
    </div>
  )
}