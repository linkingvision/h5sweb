import CoreuiVue from '@coreui/vue'
import TheHeader from '@/containers/TheHeader'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue()
localVue.use(CoreuiVue)

localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    asideShow: false,
    darkMode: false
  }
})

describe('TheHeader.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(TheHeader, { localVue, store })
    expect(wrapper.element).toMatchSnapshot()
  })
})