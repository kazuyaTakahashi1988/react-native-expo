import { StyleSheet, Text, View } from 'react-native';

import { Button } from './Button';

export type HeaderProps = {
  user?: { name: string };
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
};

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
  <View>
    <View style={styles.wrapper}>
      <View style={styles.logoContainer}>
        <Text style={styles.h1}>Acme</Text>
      </View>
      <View style={styles.buttonContainer}>
        {user ? (
          <>
            <Text>Welcome, </Text>
            <Text style={styles.userName}>{user.name}!</Text>

            <Button label='Log out' onPress={onLogout} size='small' style={styles.button} />
          </>
        ) : (
          <>
            <Button label='Log in' onPress={onLogin} size='small' style={styles.button} />
            <Button
              label='Sign up'
              onPress={onCreateAccount}
              primary
              size='small'
              style={styles.button}
            />
          </>
        )}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  h1: {
    alignSelf: 'flex-start',
    color: 'black',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 6,
    marginLeft: 10,
    marginTop: 6,
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userName: {
    fontWeight: '700',
  },
});
