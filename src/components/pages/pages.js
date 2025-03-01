import React from 'react'
import { Tabs } from 'antd'

const items = [
  {
    key: 'Search',
    label: 'Search',
  },
  {
    key: 'Rated',
    label: 'Rated',
  },
]
function Pages({ onTabCange }) {
  return <Tabs centered defaultActiveKey="Search" items={items} onChange={onTabCange} />
}
export default Pages
