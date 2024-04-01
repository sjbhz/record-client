import Vue from 'vue'
import Vuex from 'vuex'
// import VueTestcaseMinderEditor from 'vue-testcase-minder-editor'
import VueTestcaseMinderEditor from 'testcase-factor-minder-editor'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    caseEditorStore: VueTestcaseMinderEditor.caseEditorStore
  }
})
