USE [Freshpots]
GO

/****** Object:  Table [dbo].[PotLocation]    Script Date: 8/19/2015 3:04:03 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[PotLocation](
	[Id] [smallint] NOT NULL,
	[TextValue] [varchar](50) NOT NULL,
	[AuditModifiedDate] [datetime] NOT NULL DEFAULT (getdate()),
 CONSTRAINT [PK_Pot_Location] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


