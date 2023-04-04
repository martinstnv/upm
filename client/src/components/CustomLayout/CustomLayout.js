import React, { useState } from 'react';
import { Layout as AntdLayout, Menu } from 'antd';
import menuItems from '../../constants/menuItems';
import classes from "./CustomLayout.module.css";

const { Content, Sider } = AntdLayout;

const DEFAULT_MENU_ITEM = 'items';

const CustomLayout = () => {

  const [selectedMenuItem, setSelectedMenuItem] = useState(DEFAULT_MENU_ITEM);
  
  const [menuItem] = menuItems.filter(menuItem => menuItem.key === selectedMenuItem);

  return (
    <AntdLayout className={classes.Layout}>
      <Sider>
        <div className={classes.Logo}>UPM</div>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems.map(
            item => ({
              key: item.key,
              icon: React.createElement(item.icon),
              label: item.label,
              onClick: () => setSelectedMenuItem(item.key)
            })
          )}
        />
      </Sider>
      <AntdLayout>
        <Content className={classes.Content}>
          {menuItem.component && React.createElement(menuItem.component)}
        </Content>
      </AntdLayout>
    </AntdLayout>
  )
}

export default CustomLayout;