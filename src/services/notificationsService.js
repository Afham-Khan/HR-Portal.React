export const getNotifications = async () => {
    // Temporary sample data, replace this with an actual API call
    return [
      {
        title: 'New Job Post: Web Developer',
        message: 'A new job post has been added to the portal for the position of Web Developer.',
        date: '2024-10-09',
        type: 'job',
      },
      {
        title: 'Job Application Received',
        message: 'John Doe has applied for the Web Developer position.',
        date: '2024-10-08',
        type: 'application',
      },
      {
        title: 'Employee Logged In',
        message: 'Sarah Ahmed has logged into the HR portal.',
        date: '2024-10-07',
        type: 'login',
      },
      {
        title: 'Upcoming Event: Team Building Workshop',
        message: 'A team-building workshop is scheduled for 2024-10-15.',
        date: '2024-10-05',
        type: 'event',
      },
      {
        title: 'Employee Absent Today',
        message: 'James Smith is absent today due to illness.',
        date: '2024-10-09',
        type: 'attendance',
      },
    ];
  };
  