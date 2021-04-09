
import { Route, Redirect } from 'react-router-dom';

export default function RedirectRoute ({component: Component, auth, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => auth !== false
          ? <Redirect to={{pathname: '/home', state: {from: props.location}}} />
          : <Component {...props} />}
      />
    )
  }

