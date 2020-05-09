import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native';
import { Icon, Root } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TakePicture from './src/screens/takePicture';
import AddNote from './src/screens/addNote';
import EditNote from './src/screens/editNote';
import ViewPicture from './src/screens/viewPicture';
import SignUp from './src/screens/signUp';
import LogIn from './src/screens/login';
import ViewNotes from './src/screens/viewNotes';
import UploadPicture from './src/screens/uploadPicture';
import PictureProvider from './src/context/pictureContext';
import UserProvider from './src/context/userContext';
import NotesProvider from './src/context/notesContext';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RelayEnvironment from './src/RelayEnvironment';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		fontSize: 20,
	},
	nav: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 10,
	},
	navItem: {
		flex: 1,
		alignItems: 'center',
		padding: 10,
	},
	subNavItem: {
		padding: 5,
	},
	topic: {
		textAlign: 'center',
		fontSize: 15,
	},
	active: {
		borderTopColor: 'green',
		borderTopWidth: 1,
		borderStyle: 'solid',
	},
});

const Stack = createStackNavigator();

const App = (props: any) => {
	const [initializing, setInitializing] = useState<boolean>(true);
	const [activeTab, setActiveTab] = useState<string>('home');
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

	function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
		setUser(user);
		if (initializing) setInitializing(false);
	}
	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	if (initializing) return <Text>this is working</Text>;

	function PrivateRoute({ component: Component, ...rest }: any) {
		if (user) {
			return <Route {...rest} render={(props) => <Component {...props} />} />;
		}
		return (
			<Redirect
				to={{
					pathname: '/signUp',
				}}
			/>
		);
	}
	//auth().signOut();
	return (
		<>
			<Root>
				<RelayEnvironmentProvider environment={RelayEnvironment}>
					<PictureProvider>
						<NotesProvider>
							<UserProvider>
								<NavigationContainer>
									<Stack.Navigator>
										<Stack.Screen name='Home' component={HomeScreen} />
									</Stack.Navigator>
								</NavigationContainer>
							</UserProvider>
						</NotesProvider>
					</PictureProvider>
				</RelayEnvironmentProvider>
			</Root>
		</>
	);
};

export default App;
