import "./Tabs.css"

const Tabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="tabs">
            <div className="tab-container">
                <button className={`tab ${activeTab === "contact" ? "selected-tab" : ""}`} onClick={() => setActiveTab("contact")}>Contact</button>
                <button className={`tab ${activeTab === "address" ? "selected-tab" : ""}`} onClick={() => setActiveTab("address")}>Address</button>
                <button className={`tab ${activeTab === "phone" ? "selected-tab" : ""}`} onClick={() => setActiveTab("phone")}>Phone</button>
            </div>
        </div>
    )
};

export default Tabs;
