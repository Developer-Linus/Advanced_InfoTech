import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {Menu, X, ChevronDown} from 'lucide-react';
import {NavLinks} from "../constants/index.js";
import slugify from "slugify";

const NavItems = () => {
    const [navLinks, setNavLinks] = useState(NavLinks)
    const [categories, setCategories] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const navRef = useRef(null);

    // Asynchronous function to fetch categories from database
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories');

            const fetchedCategories = response.data.categories; // ✅ Fix data path

            const categoryItems = fetchedCategories.map((category) => ({
                name: category.name,
                href: `/category/${slugify(category.name, { lower: true, strict: true })}`,
            }));

            const updatedNavLinks = NavLinks.map((link) =>
                link.name === 'Categories' // ✅ Capitalized correctly
                    ? { ...link, submenu: categoryItems }
                    : link
            );

            setNavLinks(updatedNavLinks);
            setCategories(categoryItems);

        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    // Fetch categories on mount
    useEffect(() => {
        fetchCategories(); // call the async function

    }, []);

// Handle outside clicks using useEffect
    useEffect(() => {
        function handleClickOutside(event) {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setOpenDropdownId(null); // Close dropdown
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <ul className="flex gap-4" ref={navRef}>
            {navLinks.map((link) => (
                <li key={link.id} className="relative">
                    <button
                        onClick={() =>
                            setOpenDropdownId(openDropdownId === link.id ? null : link.id)
                        }
                        className="flex items-center gap-2 hover:text-blue-500"
                    >
                        {link.icon && <link.icon className="w-5 h-5" />}
                        {link.name}
                        {link.isDropdown && <ChevronDown className="w-4 h-4" />}
                    </button>

                    {/* Dropdown submenu on click */}
                    {link.submenu && link.submenu.length > 0 && openDropdownId === link.id && (
                        <ul className="absolute left-0 mt-2 w-40 bg-white shadow-md rounded z-10">
                            {link.submenu.map((item, idx) => (
                                <li key={idx}>
                                    <a
                                        href={item.href}
                                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    )
}

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(
        (prevIsOpen) => !prevIsOpen
    );


    return (
        <header className="">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center py-5 mx-auto c-space bg-blue-50" shadow:lg>
                    <a href="/">
                        <h2>Advanced InfoTech</h2>
                    </a>
                    <button className="text-neutral-400 focus:outline-none hover:text-white sm:hidden flex" aria-label="toggle menu" onClick={toggleMenu}>
                        {isOpen? <X />: <Menu/>}
                    </button>
                    <nav className="hidden sm:flex">
                        <NavItems />
                    </nav>
                </div>

            </div>
        </header>
    )
}
export default NavBar
