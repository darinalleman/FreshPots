USE [Freshpots]
GO

/****** Object:  Table [dbo].[Site]    Script Date: 8/19/2015 3:04:29 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Site](
	[Id] [smallint] NOT NULL,
	[AuditModifiedDate] [datetime] NOT NULL,
	[SiteTextValue] [nchar](32) NOT NULL,
	[FloorId] [smallint] NOT NULL,
	[Abbreviation] [nchar](32) NOT NULL,
 CONSTRAINT [PK_Site] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


