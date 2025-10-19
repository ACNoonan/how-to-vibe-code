export default {
  logo: (
    <>
      <span className="mr-2 font-extrabold">Vibe Coding Course</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        Build with AI Flow
      </span>
    </>
  ),
  project: {
    link: 'https://github.com/adamnoonan/vibe-coding-course',
  },
  docsRepositoryBase: 'https://github.com/adamnoonan/vibe-coding-course/tree/main/site',
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
          © {new Date().getFullYear()} Vibe Coding Course — Community Driven Learning
        </p>
      </div>
    ),
  },
}
