USE [Freshpots]
GO

/****** Object:  Trigger [dbo].[NewSiteNewPotTrigger]    Script Date: 8/19/2015 3:05:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[NewSiteNewPotTrigger] 
   ON [Freshpots].[dbo].[Site]  
      AFTER INSERT
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here
	if (select count(*) from Freshpots.dbo.coffeepot) = 0
	begin
		insert into Freshpots.dbo.CoffeePot values (
			'1', '1', '1','5',GETDATE(), 
			(select id from inserted))
		insert into Freshpots.dbo.CoffeePot values (
			'2', '2', '1','5',GETDATE(), 
			(select id from inserted))
		insert into Freshpots.dbo.CoffeePot values (
			'3', '3', '1','5',GETDATE(), 
			(select id from inserted))
	end
	else if (select count(*) from Freshpots.dbo.coffeepot) != 0
	begin
		insert into Freshpots.dbo.CoffeePot values (
			(select max(id) from Freshpots.dbo.coffeepot) + 1, '1', '1','5',GETDATE(), 
			(select id from inserted))	
		insert into Freshpots.dbo.CoffeePot values (
			(select max(id) from Freshpots.dbo.coffeepot) + 1, '2', '1','5',GETDATE(), 
			(select id from inserted))
		insert into Freshpots.dbo.CoffeePot values (
			(select max(id) from Freshpots.dbo.coffeepot) + 1, '3', '1','5',GETDATE(), 
			(select id from inserted))
	end
END
GO


