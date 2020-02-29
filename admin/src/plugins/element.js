import Vue from 'vue'
import {
  Button, Container, Aside, Menu, Submenu, MenuItemGroup, MenuItem,
  Header, Dropdown, DropdownMenu, DropdownItem, Table, TableColumn, Main,
  Form, FormItem, Input, MessageBox, Message, Select, Option, Upload, Rate, Tabs,
  TabPane, Row, Col, Card, pagination, scrollbar, tag
} from 'element-ui'

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Button)
Vue.use(tag)
Vue.use(Option)
Vue.use(scrollbar)
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
Vue.use(Rate)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(pagination)
