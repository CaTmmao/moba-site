import Vue from 'vue'
import {
    Button, Container, Aside, Menu, Submenu, MenuItemGroup, MenuItem,
    Header, Dropdown, DropdownMenu, DropdownItem, Table, TableColumn, Main,
    Form, FormItem, Input, MessageBox, Message, Select, Option, Upload
} from 'element-ui'

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Button)
Vue.use(Option)
Vue.use(Select)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Header)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Main)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Upload)
