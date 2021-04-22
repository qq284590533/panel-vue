import PanelContent from './panel-content.vue'
import PanelCol from './panel-col.vue'
import PanelRow from './panel-row.vue'

const components = [PanelContent, PanelCol, PanelRow]

const install = function (Vue) {
  components.forEach(comp => {
    Vue.component(comp.name, comp)
  })
}

export default {
  install
}