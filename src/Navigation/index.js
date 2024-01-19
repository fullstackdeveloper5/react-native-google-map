import { createStackNavigator, naviga } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import DrawOnMap from '../Screens/DrawOnMap';
import DashBoard from '../Screens/DashBoard';
import WalkAndDraw from '../Screens/WalkAndDraw';
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="dashboard" component={DashBoard} />
      <Stack.Screen name="draw" component={DrawOnMap} />
      <Stack.Screen name="select" component={WalkAndDraw} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
