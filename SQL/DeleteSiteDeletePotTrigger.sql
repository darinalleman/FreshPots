USE [Freshpots]
GO

/****** Object:  Trigger [dbo].[DeleteSiteDeletePotTrigger]    Script Date: 8/19/2015 3:05:01 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [dbo].[DeleteSiteDeletePotTrigger]
   ON [Freshpots].[dbo].[Site]  
      instead of delete
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here
	delete from dbo.CoffeePot 
	where (select id from deleted) = CoffeePot.SiteId 

	delete from dbo.site
	where (select id from deleted) = site.id
END

GO


