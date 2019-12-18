import Nav from './nav';

const Header = () => (
    <div className="header">
        <img src="/logo-4.svg" className="logo" />
        <Nav />
        <style jsx>{`
            .header {
                background: #eee;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .logo {
                height: 100px;
            }
        `}</style>
    </div>
);

export default Header;
