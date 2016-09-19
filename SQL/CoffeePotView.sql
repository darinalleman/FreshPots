USE [Freshpots]
GO

/****** Object:  View [dbo].[CoffeePotInfo]    Script Date: 8/19/2015 3:04:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[CoffeePotInfo]
AS
SELECT     dbo.CoffeePot.Id,  dbo.CoffeeType.TextValue AS TypeTextValue, dbo.CoffeePot.PotLocationId AS LocationId, dbo.CoffeePot.PotStatusId AS StatusId, 
                      dbo.CoffeePot.AuditModifiedDate, dbo.CoffeePot.SiteId As SiteId
FROM        dbo.CoffeePot   inner join
			dbo.CoffeeType ON dbo.CoffeePot.CoffeeTypeId = dbo.CoffeeType.Id					



GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "CoffeePot"
            Begin Extent = 
               Top = 31
               Left = 33
               Bottom = 150
               Right = 210
            End
            DisplayFlags = 280
            TopColumn = 1
         End
         Begin Table = "CoffeeType"
            Begin Extent = 
               Top = 220
               Left = 462
               Bottom = 324
               Right = 639
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "PotLocation"
            Begin Extent = 
               Top = 6
               Left = 468
               Bottom = 110
               Right = 645
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "PotStatus"
            Begin Extent = 
               Top = 126
               Left = 661
               Bottom = 230
               Right = 838
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 5040
         Alias = 3195
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'CoffeePotInfo'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'CoffeePotInfo'
GO


