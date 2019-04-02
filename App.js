import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './HomeScreen'
import ProductDetail from './ProductDetail'
import ProductDetail2 from './ProductDetail2'

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Detail: {screen: ProductDetail},
  Detail2: {screen: ProductDetail2},
});

const App = createAppContainer(MainNavigator);

export default App;
