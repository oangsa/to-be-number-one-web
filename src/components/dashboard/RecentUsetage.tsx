import React, { useEffect, useState } from 'react';
import DashboardCard from '../shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography } from '@mui/material';

const RecentTransactions = () => {

  const [data, setData] = useState<any[]>([])

  const getData = async () => {
    const res = await fetch("/api/getrecent")

    const d = await res.json()
    
    setData(d)
}

  useEffect(() => {
      
      getData();
      
  }, [])

  return (
    <DashboardCard title="Recent Usetage">
      <>
        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: '-40px',
            '& .MuiTimelineConnector-root': {
              width: '1px',
              backgroundColor: '#efefef'
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0,
              paddingLeft: 0,
            },
          }}
        >
        
        {data.map(element => {
          return (
            <TimelineItem>
              <TimelineOppositeContent>{new Date(element.studentData.timestamps).toLocaleString("th-TH", {timeZone: "Asia/Bangkok"}).split(" ")[1]}</TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="filled" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>{element.studentData.name} {element.studentData.surname}</TimelineContent>
            </TimelineItem>
          )
        })}

         
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentTransactions;
