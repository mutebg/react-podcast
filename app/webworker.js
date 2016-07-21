self.addEventListener('message', function(e) {

  let { type , payload } = e.data;

  switch( type ) {
    case 'PODCAST_ADD':
      self.postMessage({
        type,
        payload: {
          color: '#009688',
          showID: payload.channel_id,
        }
      });
    break;
  }

}, false);
