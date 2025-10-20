export default {
  logo: (
    <span className="font-extrabold">Building with AI Course</span>
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
          © {new Date().getFullYear()} Building with AI Course
        </p>
      </div>
    ),
  },
}
