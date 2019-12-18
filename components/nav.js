import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux';

const Nav = ({ menu }) => (
    <nav className="nav">
        <ul>
            <li>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </li>
            {menu.map((item) => {
                // render this is a regular 'ol URL
                if (item.fields.url) {
                    return (
                        <li key={item.sys.id}>
                            <a href={item.fields.url}>
                                {item.fields.title}
                            </a>
                        </li>
                    );
                }

                // render this as a next link
                return (
                    <li key={item.sys.id}>
                        <Link href="/page/[id]" as={`/page/${item.fields.page.sys.id}`}>
                            <a>
                                {item.fields.title}
                            </a>
                        </Link>
                    </li>
                )
            })}
        </ul>
        <style jsx>{`
            .nav ul {
                padding: 4px 16px;
                display: flex;
            }
            .nav li {
                display: flex;
                padding: 5px 20px;
                border-right: 1px solid #ccc;
            }
            .nav li:last-child {
                border-right: 0;
            }
            .nav a {
                color: #067df7;
                text-decoration: none;
                font-size: 13px;
            }`}
        </style>
    </nav>
);

const mapStateToProps = (state) => {
    return {
        menu: state.menu || [],
    }
}

export default connect(mapStateToProps)(Nav);
