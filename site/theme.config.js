export default {
  logo: (
    <>
      <span className="mr-2 font-extrabold">From Idea to App</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        Building with AI
      </span>
    </>
  ),
  project: {
    link: 'https://github.com/ACNoonan/vibe-coding-course',
  },
  docsRepositoryBase: 'https://github.com/ACNoonan/vibe-coding-course/tree/main/site',
  editLink: {
    component: null
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback'
  },
  footer: {
    component: () => (
      <div className="flex w-full flex-col items-center sm:items-start">
        <p className="mt-6 text-xs">
          © {new Date().getFullYear()} From Idea to App — Building with AI
        </p>
      </div>
    ),
  },
}
