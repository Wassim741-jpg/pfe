import {createAppContainer} from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'
import Profile from "../component/Profile";
import Home from "../component/Home";
const SearchStackNavigator = createStackNavigator({
    Home: {
        screen: Home
    },
    Profile: {
        screen: Profile
    }
})

export default createAppContainer(SearchStackNavigator)