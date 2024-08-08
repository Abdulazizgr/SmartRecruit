import AdvancedCalendar from '../../../components/Experimental/ACalender';
import Navbar from '../../../components/Experimental/Navbar';
import Sidebar from '../../../components/Experimental/Sidebar';
import NotesSection from '../../../components/Experimental/NotesSection';

const CalendarPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-[6]">
        <Navbar />
        <div className="p-4 flex flex-col lg:flex-row">
          <div className="flex-1 lg:mr-4 h-full">
            <AdvancedCalendar />
          </div>
          <div className="w-full lg:w-1/3">
            <NotesSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
