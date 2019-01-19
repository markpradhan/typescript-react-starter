// Typing
interface State {
  success: boolean
}

interface Action extends State {
  type: string
}

// Actions
const TEST = 'test/TEST'

// Reducer
export default function reducer(
  state: State = {
    success: false,
  },
  { type, success }: Action,
): State {
  switch (type) {
    case TEST:
      return { ...state, success }
    default:
      return state
  }
}

// Action Creators
export const test = () => ({
  type: TEST,
  success: true,
})
