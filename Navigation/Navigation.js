import {createAppContainer} from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'
import Profile from "../component/Profile";
import Home from "../component/Home";
import test from "../component/test";
const SearchStackNavigator = createStackNavigator({
    Home: {
        screen: Home
    },

    test: {
        screen: test
    },
    Profile: {
        screen: Profile
    }
})

export default createAppContainer(SearchStackNavigator)
