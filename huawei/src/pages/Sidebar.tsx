import { Home, Bolt, ChevronRight, CirclePlus, Album } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { sidebarProp } from '../types/sidebarType'

export default function Sidebar(prop: sidebarProp){
    const { open, setOpen } = prop
    const location = useLocation()

    function handleMouseEnter(){
        setOpen(true)
    }

    function handleMouseLeave(){
        setOpen(false)
    }

    const navi = [
        {
            path: '/',
            icon: <Home className="w-5 h-5" />,
            description: '首页'
        },
        {
            path: '/settings',
            icon: <Bolt className="w-5 h-5" />,
            description: '设置'
        },
    ]

    return (
        <div 
            className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out shadow-2xl ${
                open ? 'w-64' : 'w-20'
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="p-5 flex items-center justify-between border-b border-gray-700">
                <div className={`overflow-hidden transition-all duration-300 ${open ? 'w-32' : 'w-0'}`}>
                    <h1 className="text-xl font-bold whitespace-nowrap">管理系统</h1>
                </div>
                <ChevronRight 
                    className={`transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`} 
                    size={20} 
                />
            </div>
            
            <nav className="mt-6">
                {navi.map((item) => (
                    <Link
                        to={item.path}
                        key={item.path}
                        className={`flex items-center py-3 px-5 mx-2 rounded-lg transition-all duration-300 group ${
                            location.pathname === item.path
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                        <span className="flex items-center justify-center">
                            {item.icon}
                        </span>
                        <span 
                            className={`ml-4 overflow-hidden transition-all duration-300 whitespace-nowrap ${
                                open ? 'w-32 opacity-100' : 'w-0 opacity-0'
                            }`}
                        >
                            {item.description}
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}