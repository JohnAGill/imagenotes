import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native';
import { Icon } from 'native-base';

import TakePicture from './src/screens/takePicture';
import AddNote from './src/screens/addNote';
import ViewPicture from './src/screens/viewPicture';
import SignUp from './src/screens/signUp';
import PictureProvider from './src/context/pictureContext';
import UserProvider from './src/context/userContext';
import NotesProvider from './src/context/notesContext';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

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
});

const App = () => {
	const [initializing, setInitializing] = useState<boolean>(true);
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

	function PrivateRoute({ Component, ...rest }: any) {
		return (
			<Route
				{...rest}
				render={(props: any) =>
					user ? (
						<Component {...props} />
					) : (
						<Redirect
							to={{
								pathname: '/signUp',
								state: { from: props.location },
							}}
						/>
					)
				}
			/>
		);
	}

	return (
		<>
			<PictureProvider>
				<NotesProvider>
					<UserProvider>
						<NativeRouter>
							<View style={styles.container}>
								<Route exact path='/signUp' component={SignUp} />
								<PrivateRoute exact path='/' component={TakePicture} />
								<PrivateRoute
									exact
									path='/viewPicture'
									component={ViewPicture}
								/>
								<PrivateRoute exact path='/addNote' component={AddNote} />
								<View style={styles.nav}>
									<Link to='/' underlayColor='#f0f4f7' style={styles.navItem}>
										<Icon name='camera' />
									</Link>
								</View>
							</View>
						</NativeRouter>
					</UserProvider>
				</NotesProvider>
			</PictureProvider>
		</>
	);
};

export default App;
