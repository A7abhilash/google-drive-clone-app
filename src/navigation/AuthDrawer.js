import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Tasks from '../authScreens/Tasks';
import {globalColors, globalStyles} from '../styles/styles';
import {useDB} from '../contexts/DBContext';
import {Text, View, TouchableOpacity} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AuthDrawer({navigation: stackNavigation}) {
  const {allTags} = useDB();
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerStyle={{
        backgroundColor: globalColors.Gray,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: globalColors.Warning,
        inactiveTintColor: globalColors.Light,
        activeBackgroundColor: globalColors.Secondary,
      }}>
      <Drawer.Screen
        name="All"
        options={{
          drawerLabel: ({focused}) => (
            <View
              style={{
                borderBottomColor: globalColors.Info,
                borderBottomWidth: !focused ? 1 : 0,
                paddingBottom: !focused ? 10 : 0,
              }}>
              <Text
                style={{
                  color: focused ? globalColors.Warning : globalColors.Light,
                  fontWeight: 'bold',
                }}>
                All Tasks
              </Text>
            </View>
          ),
        }}>
        {props => (
          <Tasks {...props} stackNavigation={stackNavigation} tag="All" />
        )}
      </Drawer.Screen>
      {allTags !== null &&
        allTags.map(tag => (
          <Drawer.Screen name={tag} key={tag}>
            {props => (
              <Tasks {...props} tag={tag} stackNavigation={stackNavigation} />
            )}
          </Drawer.Screen>
        ))}
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <TopHeader />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const TopHeader = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 5,
        borderBottomColor: globalColors.Secondary,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Profile />
      <Logout />
    </View>
  );
};

const Logout = () => {
  const {logout} = useAuth();

  return (
    <TouchableOpacity onPress={logout}>
      <MaterialIcons name="logout" size={24} color={globalColors.Danger} />
    </TouchableOpacity>
  );
};

const Profile = () => {
  const {user} = useAuth();

  return (
    <View>
      <Text
        style={{
          ...globalStyles.textSubTitle,
          color: globalColors.Info,
        }}>
        Get Stuff Done
      </Text>
      <Text
        style={{
          color: globalColors.Light,
        }}>
        {user.email}
      </Text>
    </View>
  );
};
