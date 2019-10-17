import React from 'react';
import {Providers, MsalProvider, ProviderState} from '@microsoft/mgt';

Providers.globalProvider = new MsalProvider({
  clientId: 'a974dfa0-9f57-49b9-95db-90f04ce2111a'
});


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      events: null
    }

    let p = Providers.globalProvider;
    p.onStateChanged(async () => {
      if (p && p.state === ProviderState.SignedIn){
        let events = await p.graph.client.api('me/calendarview?$orderby=start/dateTime&startdatetime=2019-10-16T07:00:00.000Z&enddatetime=2019-10-26T07:00:00.000Z').get();
        this.setState({events: events.value});
      }
    })
  }

  render() {
    if (this.state.events){
      return (
        <div className="events">
          <mgt-agenda ref="agenda"></mgt-agenda>
        </div>
      );
    } else {
      return <div>
        <mgt-login></mgt-login>
      </div>
    }
  }

  componentDidUpdate(){
    if (this.refs.agenda) {
        console.log('setting events');
        // this.refs.agenda.events = this.state.events;
        this.refs.agenda.days = 3;
    }
  }
  
}

export default App;
