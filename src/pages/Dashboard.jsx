import React, { useState } from 'react';
import { Bell, Search, User, BarChart2, Users, Briefcase, DollarSign, FileText, Calendar,  CreditCard, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../Components/Layout/ui/card.tsx";
import { Button } from "../Components/Layout/ui/button.tsx";
import { Input } from "../Components/Layout/ui/input.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "../Components/Layout/ui/avatar.tsx";
import { Bar } from 'react-chartjs-2'; // Import the Bar component from react-chartjs-2
import { FaBell } from 'react-icons/fa';
import { useNavigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';



// Importing the performance management component
import PerformanceManagement from './EmployeePerformanceManagement.jsx';


import './Dashboard.css';

// Import other pages
import SalaryPage from './salary';
import EmployeesPage from './Employees';
import CandidatesPage from './Candidates';
import JobsPage from './Jobs';
import Attendance from './Attendance.jsx';
import Login from './login.jsx';
import SignUp from './SignUp.jsx';
import Notifications from './Notification.jsx';




const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSearch = () => {
    console.log('Searching for:', searchQuery); // You can perform a search here
    // You can filter data or call an API with the searchQuery
  };

   // State to track if there's a new notification
   const [isNotificationNew, setIsNotificationNew] = useState(true);

   // Logic to handle notification click
   const handleNotificationClick = () => {
     console.log('Notification clicked');
     
     // Logic to mark the notification as read
     setIsNotificationNew(false); // Mark the notification as read
   };
   const NotificationButton = () => {
    const navigate = useNavigate();
  
    const handleNotificationClick = () => {
      navigate('/notifications');
    };
  
    
  };

  

  const renderPage = () => {
    switch (currentPage) {
      case 'salary':
        return <SalaryPage />;
      case 'employees':
        return <EmployeesPage />;
        case 'Attendance': // This case is added for Performance Management
        return <Attendance />;
      case 'candidates':
        return <CandidatesPage />;
      case 'jobs':
        return <JobsPage />;
      case 'performance': // This case is added for Performance Management
        return <PerformanceManagement />;
      case 'login':
        return <Login/>
      case 'SignUp':
        return <SignUp/>
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      <h2 className="dashboard__title">Dashboard</h2>
      <div className="dashboard__cards">
        <Card className="dashboard__card">
          <CardHeader className="dashboard__card-header">
            <CardTitle className="dashboard__card-title">Total Employees</CardTitle>
            <Users className="dashboard__card-icon" />
          </CardHeader>
          <CardContent>
            <div className="dashboard__card-value">1,234</div>
            <p className="dashboard__card-subtext">+2% from last month</p>
          </CardContent>
        </Card>
        <Card className="dashboard__card">
          <CardHeader className="dashboard__card-header">
            <CardTitle className="dashboard__card-title">Open Positions</CardTitle>
            <Briefcase className="dashboard__card-icon" />
          </CardHeader>
          <CardContent>
            <div className="dashboard__card-value">23</div>
            <p className="dashboard__card-subtext">5 new this week</p>
          </CardContent>
        </Card>
        <Card className="dashboard__card">
          <CardHeader className="dashboard__card-header">
            <CardTitle className="dashboard__card-title">Pending Applications</CardTitle>
            <FileText className="dashboard__card-icon" />
          </CardHeader>
          <CardContent>
            <div className="dashboard__card-value">45</div>
            <p className="dashboard__card-subtext">12 new today</p>
          </CardContent>
        </Card>
        <Card className="dashboard__card">
          <CardHeader className="dashboard__card-header">
            <CardTitle className="dashboard__card-title">Total Payroll</CardTitle>
            <DollarSign className="dashboard__card-icon" />
          </CardHeader>
          <CardContent>
            <div className="dashboard__card-value">$3,456,789</div>
            <p className="dashboard__card-subtext">+5.2% from last month</p>
          </CardContent>

      
        </Card>
        

      </div>

      <div className="dashboard__additional-content">
  <Card className="dashboard__attendance">
    <CardHeader>
      <CardTitle>Today's Attendance</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="attendance__stats">
        <div className="attendance__stat">
          <div className="attendance__circle attendance__circle--present">
            95.6%
          </div>
          <span className="attendance__value">1,180 Present</span>
        </div>
        <div className="attendance__stat">
          <div className="attendance__circle attendance__circle--late">
            3.4%
          </div>
          <span className="attendance__value">42 Late</span>
        </div>
        <div className="attendance__stat">
          <div className="attendance__circle attendance__circle--absent">
            1%
          </div>
          <span className="attendance__value">12 Absent</span>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card className="dashboard__events">
    <CardHeader>
      <CardTitle>Upcoming Events</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="events__list">
        <li className="events__item">
          <Calendar className="events__icon" />
          <span>Team Building Event (June 15)</span>
        </li>
        <li className="events__item">
          <Users className="events__icon" />
          <span>Quarterly Review Meeting (June 30)</span>
        </li>
        <li className="events__item">
          <Star className="events__icon" />
          <span>Employee of the Month Announcement (July 1)</span>
        </li>
      </ul>
    </CardContent>
  </Card>
</div>


      <div className="dashboard__bottom-row">
  <Card className="dashboard__performance">
    <CardHeader>
      <CardTitle><h2>Recent Performance Highlights</h2></CardTitle>
    </CardHeader>
    <CardContent className="employee__container">
  <ul className="employee__list">

    <li className="employee__item">
      <div className="employee__avatar">
        <img src="https://img.freepik.com/free-photo/young-man-glassess-is-working-his-workplace-office-he-wears-blue-shirt-he-is-writing-notebook-smiling-camera_197531-538.jpg" 
             alt="John Doe" />
      </div>
      <div className="employee__achievement">
        <h3>Employee of the Month</h3>
        <p>Achieved highest sales in the company for two consecutive months</p>
      </div>
      <div className="employee__details">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Hiring Year:</strong> 2021</p>
        <p><strong>Profession:</strong> Sales Manager</p>
        <p><strong>Department:</strong> Sales and Marketing</p>
      </div>
    </li>

    <li className="employee__item">
      <div className="employee__avatar">
        <img src="https://img.freepik.com/free-photo/young-smiling-man-office_144627-20462.jpg" 
             alt="Jane Smith" />
      </div>
      <div className="employee__achievement">
        <h3>Project Excellence</h3>
        <p>Successfully completed the web development project ahead of time</p>
      </div>
      <div className="employee__details">
        <p><strong>Name:</strong> Jane Smith</p>
        <p><strong>Hiring Year:</strong> 2019</p>
        <p><strong>Profession:</strong> Software Engineer</p>
        <p><strong>Department:</strong> IT & Development</p>
      </div>
    </li>

    <li className="employee__item">
      <div className="employee__avatar">
        <img src="https://img.freepik.com/free-photo/serious-man-suit-with-crossed-arms_23-2147574140.jpg?ga=GA1.1.838932793.1728410623&semt=ais_hybrid" 
             alt="Michael Brown" />
      </div>
      <div className="employee__achievement">
        <h3>Client Satisfaction Award</h3>
        <p>Received highest client satisfaction ratings for the last quarter</p>
      </div>
      <div className="employee__details">
        <p><strong>Name:</strong> Michael Brown</p>
        <p><strong>Hiring Year:</strong> 2018</p>
        <p><strong>Profession:</strong> Account Manager</p>
        <p><strong>Department:</strong> Customer Relations</p>
      </div>
    </li>

    <li className="employee__item">
      <div className="employee__avatar">
        <img src="https://img.freepik.com/free-photo/executive-blue-suit-arms-crossed_1139-200.jpg?ga=GA1.1.838932793.1728410623&semt=ais_hybrid" 
             alt="Emily White" />
      </div>
      <div className="employee__achievement">
        <h3>Innovation Leader</h3>
        <p>Introduced new marketing strategies leading to a 30% growth in revenue</p>
      </div>
      <div className="employee__details">
        <p><strong>Name:</strong> Emily White</p>
        <p><strong>Hiring Year:</strong> 2020</p>
        <p><strong>Profession:</strong> Marketing Director</p>
        <p><strong>Department:</strong> Marketing</p>
      </div>
    </li>

    <li className="employee__item">
      <div className="employee__avatar">
        <img src="https://img.freepik.com/free-photo/business-concept-portrait-handsome-business-man-holding-hands-with-confident-face-white-background_1258-103959.jpg?ga=GA1.1.838932793.1728410623&semt=ais_hybrid" 
             alt="David Green" />
      </div>
      <div className="employee__achievement">
        <h3>Operational Excellence</h3>
        <p>Optimized workflows, increasing overall team efficiency by 15%</p>
      </div>
      <div className="employee__details">
        <p><strong>Name:</strong> David Green</p>
        <p><strong>Hiring Year:</strong> 2017</p>
        <p><strong>Profession:</strong> Operations Manager</p>
        <p><strong>Department:</strong> Operations</p>
      </div>
    </li>

    <li className="employee__item">
      <div className="employee__avatar">
        <img src="https://img.freepik.com/free-photo/man-with-folded-hands_23-2147574145.jpg?ga=GA1.1.838932793.1728410623&semt=ais_hybrid" 
             alt="Sara Blue" />
      </div>
      <div className="employee__achievement">
        <h3>Leadership Award</h3>
        <p>Led the successful integration of a new software system</p>
      </div>
      <div className="employee__details">
        <p><strong>Name:</strong> Sara Blue</p>
        <p><strong>Hiring Year:</strong> 2016</p>
        <p><strong>Profession:</strong> IT Director</p>
        <p><strong>Department:</strong> Technology</p>
      </div>
    </li>

  </ul>
</CardContent>

  </Card>
  <Card className="dashboard__department-overview">
    <CardHeader>
      <CardTitle><h2>Department Overview</h2></CardTitle>
    </CardHeader>
    <Card className="dashboard__department-overview">
          <CardHeader>
        
          </CardHeader>
          <CardContent>
            {/* Bar Chart */}
            <div className="department-overview__chart">
              <Bar
                data={{
                  labels: ['HR', 'Sales', 'IT', 'Marketing', 'Finance'],
                  datasets: [
                    {
                      label: 'Employees',
                      data: [12, 19, 3, 5, 2], // Sample data
                      backgroundColor: 'rgba(75, 192, 192, 0.6)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
  </Card>
</div>

    </>
  );

  return (
    <div className="hr-portal">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>

        <h1 className="sidebar__title">HR Portal</h1>
        <nav className="sidebar__nav">
          <Button variant="ghost" className="sidebar__button" onClick={() => setCurrentPage('dashboard')}>
            <BarChart2 className="sidebar__icon" />
            Dashboard
          </Button>
          <Button variant="ghost" className="sidebar__button" onClick={() => setCurrentPage('employees')}>
            <Users className="sidebar__icon" />
            Employees
          </Button>
          <Button variant="ghost" className="sidebar__button" onClick={() => setCurrentPage('Attendance')}>
            <Star className="sidebar__icon" />
            Attendance
          </Button>
          <Button variant="ghost" className="sidebar__button" onClick={() => setCurrentPage('candidates')}>
            <FileText className="sidebar__icon" />
            Candidates
          </Button>
          <Button variant="ghost" className="sidebar__button" onClick={() => setCurrentPage('jobs')}>
            <Briefcase className="sidebar__icon" />
            Jobs
          </Button>
          <Button variant="ghost" className="sidebar__button" onClick={() => setCurrentPage('salary')}>
            <CreditCard className="sidebar__icon" />
            Salary
          </Button>
          <Button variant="ghost" className="sidebar__button" onClick={() => setCurrentPage('performance')}>
            <Star className="sidebar__icon" />
            Performance Management
          </Button>
          {/* <Button variant="ghost" className="sidebar__button" onClick={() => setCurrentPage('login')}>
            <Star className="sidebar__icon" />
            Login
          </Button> */}
          <button className="notifications" variant="ghost" onClick={() => setCurrentPage('notification')}>
  <FaBell className="notification-icon" />
</button>

          <button className="user-profile" variant="ghost" onClick={() => setCurrentPage('login')} >
            <User className="user-icon" />
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">


          <div className="search-bar">

          <button className="header__menu-button" onClick={toggleSidebar}>  
            ☰
          </button></div>
          
          <div className="header__search">
           

            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}

            />
            <Button className="search-button">
              <Search className="search-icon" />
            </Button>

             <Search className="header__search-icon" />
          </div>

          
        </header>

        <div className="content">
          {renderPage()}
        </div>
      </main>
    </div>

  );
};
export default Dashboard;