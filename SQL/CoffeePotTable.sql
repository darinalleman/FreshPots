USE [Freshpots]
GO

/****** Object:  Table [dbo].[CoffeePot]    Script Date: 8/19/2015 3:02:51 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CoffeePot](
	[Id] [tinyint] NOT NULL,
	[PotLocationId] [smallint] NOT NULL,
	[PotStatusId] [smallint] NOT NULL,
	[CoffeeTypeId] [smallint] NOT NULL,
	[AuditModifiedDate] [datetime] NOT NULL CONSTRAINT [DF_CoffeePot_AuditModifiedDate]  DEFAULT (getdate()),
	[SiteId] [smallint] NOT NULL,
 CONSTRAINT [PK_COFFEE_POTS] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[CoffeePot]  WITH CHECK ADD FOREIGN KEY([SiteId])
REFERENCES [dbo].[Site] ([Id])
GO

ALTER TABLE [dbo].[CoffeePot]  WITH CHECK ADD  CONSTRAINT [FK_CoffeePots_PotLocation] FOREIGN KEY([PotLocationId])
REFERENCES [dbo].[PotLocation] ([Id])
GO

ALTER TABLE [dbo].[CoffeePot] CHECK CONSTRAINT [FK_CoffeePots_PotLocation]
GO

ALTER TABLE [dbo].[CoffeePot]  WITH CHECK ADD  CONSTRAINT [FK_CoffeePots_PotStatus] FOREIGN KEY([PotStatusId])
REFERENCES [dbo].[PotStatus] ([Id])
GO

ALTER TABLE [dbo].[CoffeePot] CHECK CONSTRAINT [FK_CoffeePots_PotStatus]
GO

ALTER TABLE [dbo].[CoffeePot]  WITH CHECK ADD  CONSTRAINT [FK_CoffeePots_PotType] FOREIGN KEY([CoffeeTypeId])
REFERENCES [dbo].[CoffeeType] ([Id])
GO

ALTER TABLE [dbo].[CoffeePot] CHECK CONSTRAINT [FK_CoffeePots_PotType]
GO


