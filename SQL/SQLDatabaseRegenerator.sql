USE [Freshpots];
SET NOCOUNT ON;
SET XACT_ABORT ON;
GO

BEGIN TRANSACTION;
INSERT INTO [dbo].[CoffeeType]([Id], [TextValue], [AuditModifiedDate])
SELECT 1, N'Regular', '20150629 10:56:10.463' UNION ALL
SELECT 2, N'Mosaic - Guatemalan', '20150629 10:53:13.247' UNION ALL
SELECT 3, N'Decaf', '20150706 09:34:07.947' UNION ALL
SELECT 4, N'Cuban', '20150630 13:17:10.520' UNION ALL
SELECT 5, N'Empty', '20150115 09:27:26.600' UNION ALL
SELECT 6, N'Mosaic - Nicaraguan', '20150814 16:07:57.103' UNION ALL
SELECT 7, N'Pine', '20150817 16:06:03.497' UNION ALL
SELECT 8, N'Mohican', '20150706 09:55:41.690' UNION ALL
SELECT 9, N'Peppermint', '20150819 13:38:25.217'
COMMIT;
RAISERROR (N'[dbo].[CoffeeType]: Insert Batch: 1.....Done!', 10, 1) WITH NOWAIT;
GO

BEGIN TRANSACTION;
INSERT INTO [dbo].[PotLocation]([Id], [TextValue], [AuditModifiedDate])
SELECT 1, N'Upper', '20150113 16:32:19.230' UNION ALL
SELECT 2, N'LowerLeft', '20150113 16:32:23.850' UNION ALL
SELECT 3, N'LowerRight', '20150113 16:32:28.403'
COMMIT;
RAISERROR (N'[dbo].[PotLocation]: Insert Batch: 1.....Done!', 10, 1) WITH NOWAIT;
GO

BEGIN TRANSACTION;
INSERT INTO [dbo].[PotStatus]([Id], [TextValue], [AuditModifiedDate])
SELECT 1, N'Empty', '20150113 16:31:47.893' UNION ALL
SELECT 2, N'Brewed', '20150113 16:31:53.543' UNION ALL
SELECT 3, N'Expired', '20150113 16:32:09.220'
COMMIT;
RAISERROR (N'[dbo].[PotStatus]: Insert Batch: 1.....Done!', 10, 1) WITH NOWAIT;
GO

BEGIN TRANSACTION;
INSERT INTO [dbo].[Site]([Id], [AuditModifiedDate], [SiteTextValue], [FloorId], [Abbreviation])
SELECT 1, '20150814 10:41:35.450', N'Chambersburg                    ', 2, N'CBG                             ' UNION ALL
SELECT 2, '20150814 11:27:35.680', N'Chambersburg                    ', 1, N'CBG                             ' UNION ALL
SELECT 3, '20150817 15:41:23.953', N'Hagerstown                      ', 1, N'HGR                             ' UNION ALL
SELECT 4, '20150817 15:41:31.217', N'Hagerstown                      ', 2, N'HGR                             ' UNION ALL
SELECT 5, '20150814 11:28:06.990', N'Mechanicsburg                   ', 1, N'MCB                             ' UNION ALL
SELECT 6, '20150817 15:39:11.233', N'Oshkosh                         ', 1, N'OSK                             ' UNION ALL
SELECT 7, '20150817 15:40:00.173', N'York                            ', 1, N'YRK                             '
COMMIT;
RAISERROR (N'[dbo].[Site]: Insert Batch: 1.....Done!', 10, 1) WITH NOWAIT;
GO

BEGIN TRANSACTION;
INSERT INTO [dbo].[CoffeePot]([Id], [PotLocationId], [PotStatusId], [CoffeeTypeId], [AuditModifiedDate], [SiteId])
SELECT 1, 1, 2, 1, '20150819 13:43:25.153', 1 UNION ALL
SELECT 2, 2, 1, 5, '20150819 14:10:52.003', 1 UNION ALL
SELECT 3, 3, 2, 7, '20150819 13:43:37.040', 1 UNION ALL
SELECT 4, 1, 1, 5, '20150819 11:36:46.837', 2 UNION ALL
SELECT 5, 2, 2, 1, '20150819 13:33:49.253', 2 UNION ALL
SELECT 6, 3, 1, 5, '20150817 16:35:12.270', 2 UNION ALL
SELECT 13, 1, 2, 9, '20150819 14:01:22.273', 5 UNION ALL
SELECT 14, 2, 2, 1, '20150819 14:01:40.120', 5 UNION ALL
SELECT 15, 3, 1, 5, '20150819 10:36:15.070', 5 UNION ALL
SELECT 16, 1, 2, 1, '20150818 13:49:48.343', 6 UNION ALL
SELECT 17, 2, 2, 9, '20150819 13:43:04.577', 6 UNION ALL
SELECT 18, 3, 1, 5, '20150819 13:43:00.940', 6 UNION ALL
SELECT 19, 1, 1, 5, '20150819 11:36:29.567', 7 UNION ALL
SELECT 20, 2, 1, 5, '20150819 11:36:31.953', 7 UNION ALL
SELECT 21, 3, 1, 5, '20150819 11:36:32.873', 7 UNION ALL
SELECT 22, 1, 2, 1, '20150819 10:54:07.997', 3 UNION ALL
SELECT 23, 2, 2, 3, '20150819 14:06:36.500', 3 UNION ALL
SELECT 24, 3, 2, 6, '20150819 10:39:12.353', 3 UNION ALL
SELECT 25, 1, 2, 7, '20150819 13:37:15.890', 4 UNION ALL
SELECT 26, 2, 2, 9, '20150819 13:38:46.700', 4 UNION ALL
SELECT 27, 3, 1, 5, '20150817 15:41:31.043', 4
COMMIT;
RAISERROR (N'[dbo].[CoffeePot]: Insert Batch: 1.....Done!', 10, 1) WITH NOWAIT;
GO

