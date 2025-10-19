import TodoCheckbox from './components/TodoCheckbox'
import Callout from './components/Callout'
import DownloadButton from './components/DownloadButton'
import EditableInput from './components/EditableInput'

export function useMDXComponents(components) {
  return {
    TodoCheckbox,
    Callout,
    DownloadButton,
    EditableInput,
    ...components,
  }
}
