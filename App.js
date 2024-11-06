import React, {useContext} from "react"
import AppNavigator from "./AppNavigator"
import { MyProvider } from "./MyContext"

const App = () => {
  return (
    <MyProvider>
      <AppNavigator />
    </MyProvider>
  )
}
export default App