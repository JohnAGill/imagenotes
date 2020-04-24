import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
	NativeRouter,
	Route,
	Link,
	Redirect,
	useHistory,
} from 'react-router-native';
import { Icon } from 'native-base';
import Relay from 'react-relay';
// @ts-ignore
import useRelay from 'react-router-relay';
// @ts-ignore
import RelayLocalSchema from 'relay-local-schema';

import TakePicture from './src/screens/takePicture';
import AddNote from './src/screens/addNote';
import ViewPicture from './src/screens/viewPicture';
import SignUp from './src/screens/signUp';
import LogIn from './src/screens/login';
import Home from './src/screens/home';
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

	return (
		<>
			<RelayEnvironmentProvider environment={RelayEnvironment}>
				<PictureProvider>
					<NotesProvider>
						<UserProvider>
							<NativeRouter>
								<View style={styles.container}>
									<Route exact path='/signUp' component={SignUp} />
									<Route exact path='/logIn' component={LogIn} />
									<PrivateRoute exact path='/' component={ViewNotes} />
									<PrivateRoute
										exact
										path='/takePicture'
										component={TakePicture}
									/>
									<PrivateRoute
										exact
										path='/uploadPicture'
										component={UploadPicture}
									/>
									<PrivateRoute
										exact
										path='/viewPicture'
										component={ViewPicture}
									/>
									<PrivateRoute exact path='/addNote' component={AddNote} />
									<View style={styles.nav}>
										<Link
											onPress={() => setActiveTab('home')}
											to='/'
											underlayColor='#f0f4f7'
											style={[
												styles.navItem,
												activeTab === 'home' && styles.active,
											]}
										>
											<Icon name='home' />
										</Link>
										<Link
											onPress={() => setActiveTab('takePicture')}
											to='/takePicture'
											underlayColor='#f0f4f7'
											style={[
												styles.navItem,
												activeTab === 'takePicture' && styles.active,
											]}
										>
											<Icon name='camera' />
										</Link>
										<Link
											onPress={() => setActiveTab('uploadPicture')}
											to='/uploadPicture'
											underlayColor='#f0f4f7'
											style={[
												styles.navItem,
												activeTab === 'uploadPicture' && styles.active,
											]}
										>
											<Icon name='photos' />
										</Link>
									</View>
								</View>
							</NativeRouter>
						</UserProvider>
					</NotesProvider>
				</PictureProvider>
			</RelayEnvironmentProvider>
		</>
	);
};

export default App;
