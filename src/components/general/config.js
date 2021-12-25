import React from 'react';

import { HomeOutlined, DollarCircleOutlined, FileSearchOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons'
import { mainColor } from '../../styles/config';
import { routes } from '../../route';

export const navBarItems = [
    {
        icon: <HomeOutlined style={{ color: 'white', fontSize: '25px' }} />,
        activeIcon: <HomeOutlined style={{ color: mainColor, fontSize: '25px' }} />,
        text: 'Home',
        value: 'home',
        path: '/',
    },
    {
        icon: <DollarCircleOutlined style={{ color: 'white', fontSize: '25px' }} />,
        activeIcon: <DollarCircleOutlined style={{ color: mainColor, fontSize: '25px' }} />,
        text: 'Billing',
        value: 'billing',
        path: '/billing',
    },
    {
        icon: <FileSearchOutlined style={{ color: 'white', fontSize: '25px' }} />,
        activeIcon: <FileSearchOutlined style={{ color: mainColor, fontSize: '25px' }} />,
        text: 'Explore',
        value: 'explore',
        path: '/explore',
    },
    {
        icon: <FileTextOutlined style={{ color: 'white', fontSize: '25px' }} />,
        activeIcon: <FileTextOutlined style={{ color: mainColor, fontSize: '25px' }} />,
        text: 'Record',
        value: 'record',
        path: '/record',
    },
    {
        icon: <UserOutlined style={{ color: 'white', fontSize: '25px' }} />,
        activeIcon: <UserOutlined style={{ color: mainColor, fontSize: '25px' }} />,
        text: 'Profile',
        value: 'profile',
        path: '/profile',
        childrenRoutes : [routes.setting.to()]
    },
]