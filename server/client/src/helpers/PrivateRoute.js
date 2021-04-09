
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute ({component: Component, auth, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => auth !== false || auth !== null
          ? <Component {...props} />
          : <Redirect to={{pathname: '/signin', state: {from: props.location}}} />}
      />
    )
  }

