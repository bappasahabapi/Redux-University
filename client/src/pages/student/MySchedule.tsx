

import { useGetAllEnrolledCoursesQuery } from '../../redux/features/student/studentCourseManagement.api';
import { List, Card, Typography } from 'antd';

type TCourseItem = {
    _id: string;
    course: {
        title: string;
        prefix: string;
        code: number;
    };
    offeredCourse: {
        section: number;
        days: string[];
        startTime: string;
        endTime: string;
    };
    faculty: {
        name: {
            firstName: string;
            lastName: string;
        };
    };
};


const MySchedule = () => {
    const { data } = useGetAllEnrolledCoursesQuery(undefined);

    // Extracting enrolled courses from the response
    // const enrolledCourses:any  = data?.data || [];
    const enrolledCourses: TCourseItem[] = data?.data || [];


    return (
        <div>
            <Typography.Title level={2}>My Enrolled Courses</Typography.Title>
            {enrolledCourses.length > 0 ? (
                <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={enrolledCourses}
                    renderItem={(item) => (
                        <List.Item>
                            <Card title={`${item.course.title} (${item.course.prefix}-${item.course.code})`}>
                                <p><b>Section:</b> {item.offeredCourse.section}</p>
                                <p><b>Days:</b> {item.offeredCourse.days.join(', ')}</p>
                                <p><b>Time:</b> {item.offeredCourse.startTime} - {item.offeredCourse.endTime}</p>
                                <p><b>Faculty:</b> {item.faculty.name.firstName} {item.faculty.name.lastName}</p>
                            </Card>
                        </List.Item>
                    )}
                />
            ) : (
                <Typography.Text>No enrolled courses found.</Typography.Text>
            )}
        </div>
    );
};

export default MySchedule;
