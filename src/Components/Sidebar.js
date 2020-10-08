import React from 'react'
import './Sidebar.css'
import './SidebarRow'
import PeopleIcon from '@material-ui/icons/People'
import ChatIcon from '@material-ui/icons/Chat'
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags'
import StoreFrontIcon from '@material-ui/icons/Storefront'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import ExpandMoreOutlined from '@material-ui/icons/ExpandMoreOutlined'
import SidebarRow from './SidebarRow'
import {useStateValue} from '../StateProvider'
const Sidebar = () => {
    const [{user}, dispatch] = useStateValue()
    return (
        <div>
            <SidebarRow src = {user.photoURL} title={user.displayName}/>
            <SidebarRow Icon={LocalHospitalIcon} title='Covid-19 Information'/>
            <SidebarRow Icon={EmojiFlagsIcon} title='Pages'/>
            <SidebarRow Icon={PeopleIcon} title='Friends'/>
            <SidebarRow Icon={ChatIcon} title='Messenger'/>
            <SidebarRow Icon={StoreFrontIcon} title='Marketplace'/>
            <SidebarRow Icon={VideoLibraryIcon} title='Videos'/>
            <SidebarRow Icon={ExpandMoreOutlined} title='More'/>
        </div>
    )
}

export default Sidebar
