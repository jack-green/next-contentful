const Hero = ({ field, title }) => {
    if (!field) return null;
    return (
        <div>
            <div className="hero" style={{backgroundImage: `url('${field.fields.file.url}')` }}>
                <h1>{title}</h1>
            </div>
            <style jsx>{`
                .hero {
                    height: 200px;
                    background-position: center center;
                    background-size: cover;
                    background-repeat: none;
                    padding: 40px;
                    margin-bottom: 50px;
                }
                
                .hero h1 {
                    color: white;
                    text-shadow: 0 0 5px black;
                    text-transform: uppercase;
                }`}
            </style>
        </div>
    );
};

export default Hero;
