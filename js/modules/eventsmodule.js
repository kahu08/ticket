/**
 * Created by cate on 7/10/17.
 */
const state = {
  events: []
}

const mutations = {
  UPDATE_EVENTS (state, events) {
    alert(events.name)
    state.events = events
  }
}
