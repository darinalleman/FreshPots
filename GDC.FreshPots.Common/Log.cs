using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;

namespace GDC.FreshPots.Common
{
    //This class creates and fills a log file for developers
    //and users to look at exception and warnings in the code 
    //after runtime.
    public class Log
    {
        public static void Write(string header, string exception)
        {
            string eSource = "FreshPots Source";
            string eLog = "FreshPots Log";

            EventLog eventLog = new EventLog();

            if (!EventLog.SourceExists(eSource))
            {
                EventLog.CreateEventSource(eSource, eLog);
            }

            eventLog.Source = eSource;
            eventLog.Log = eLog;
            eventLog.EnableRaisingEvents = true;

            eventLog.WriteEntry(header, EventLogEntryType.Warning);
            eventLog.WriteEntry(exception, EventLogEntryType.Warning);
        }
    }
}
