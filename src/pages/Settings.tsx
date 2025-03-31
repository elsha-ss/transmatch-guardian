
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Eye, 
  Languages, 
  Mail, 
  MessageSquare, 
  Key, 
  Lock, 
  Fingerprint, 
  ShieldCheck, 
  LogOut, 
  Laptop, 
  Smartphone, 
  Upload, 
  Download, 
  FileText,
  Slack,
  Github
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Settings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set page title
    document.title = "Settings | TransMatch Guardian";
  }, []);

  const handleSaveSettings = (section: string) => {
    toast({
      title: `${section} Settings Saved`,
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <PageLayout title="Settings" description="Configure application settings and preferences">
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your account preferences and application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Display Preferences
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4 text-muted-foreground" />
                      <select 
                        id="language" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="en-US">English (US)</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <select 
                        id="timezone" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="UTC">UTC (Coordinated Universal Time)</option>
                        <option value="EST">EST (Eastern Standard Time)</option>
                        <option value="CST">CST (Central Standard Time)</option>
                        <option value="PST">PST (Pacific Standard Time)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Appearance
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-muted-foreground" />
                      <Switch id="dark-mode" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Text Size</Label>
                    <div className="flex items-center gap-4 pt-2">
                      <span className="text-sm">A</span>
                      <Slider defaultValue={[50]} max={100} step={1} className="flex-1" />
                      <span className="text-lg">A</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="compact-view">Compact View</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="compact-view" />
                      <Label htmlFor="compact-view" className="text-sm font-normal">Show compact tables and lists to display more data</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Laptop className="h-5 w-5" />
                  Session Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-logout">Auto Logout</Label>
                      <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                    </div>
                    <Switch id="auto-logout" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="session-timeout" 
                      type="number" 
                      placeholder="30" 
                      min="5" 
                      max="120" 
                      defaultValue="30" 
                      disabled={false} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => navigate("/settings")}>Cancel</Button>
                <Button onClick={() => handleSaveSettings("General")}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Control how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Alert Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="fraud-alerts">Fraud Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications for potential fraud</p>
                    </div>
                    <Switch id="fraud-alerts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="risk-alerts">Risk Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications for risk level changes</p>
                    </div>
                    <Switch id="risk-alerts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-alerts">System Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications for system updates</p>
                    </div>
                    <Switch id="system-alerts" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Notifications
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-frequency">Email Digest Frequency</Label>
                    <RadioGroup defaultValue="daily" className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="realtime" id="realtime" />
                        <Label htmlFor="realtime" className="font-normal">Real-time (individual emails)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily" id="daily" />
                        <Label htmlFor="daily" className="font-normal">Daily summary</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekly" id="weekly" />
                        <Label htmlFor="weekly" className="font-normal">Weekly summary</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-address">Notification Email Address</Label>
                    <Input id="email-address" type="email" placeholder="your.email@example.com" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  In-App Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="desktop-notifications">Desktop Notifications</Label>
                      <p className="text-sm text-muted-foreground">Show notifications in your browser</p>
                    </div>
                    <Switch id="desktop-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sound-alerts">Sound Alerts</Label>
                      <p className="text-sm text-muted-foreground">Play sound when notifications arrive</p>
                    </div>
                    <Switch id="sound-alerts" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notification-sound">Notification Sound</Label>
                    <select 
                      id="notification-sound" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      disabled={false}
                    >
                      <option value="default">Default Alert</option>
                      <option value="chime">Chime</option>
                      <option value="bell">Bell</option>
                      <option value="ping">Ping</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => navigate("/settings")}>Cancel</Button>
                <Button onClick={() => handleSaveSettings("Notification")}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and authentication preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Password Management
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" placeholder="Enter current password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" placeholder="Enter new password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                  </div>
                  
                  <Button variant="outline" className="w-auto">
                    Change Password
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Fingerprint className="h-5 w-5" />
                  Two-Factor Authentication
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-2fa">Enable Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="enable-2fa" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="2fa-method">Preferred 2FA Method</Label>
                    <select 
                      id="2fa-method" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      disabled={true}
                    >
                      <option value="app">Authenticator App</option>
                      <option value="sms">SMS</option>
                      <option value="email">Email</option>
                    </select>
                  </div>
                  
                  <Button variant="outline" className="w-auto" disabled={true}>
                    Set Up Two-Factor Authentication
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  Login Security
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="suspicious-login">Monitor Suspicious Logins</Label>
                      <p className="text-sm text-muted-foreground">Get notified about logins from unusual locations</p>
                    </div>
                    <Switch id="suspicious-login" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="remember-devices">Remember Trusted Devices</Label>
                      <p className="text-sm text-muted-foreground">Skip verification steps on devices you've used before</p>
                    </div>
                    <Switch id="remember-devices" defaultChecked />
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" className="w-auto">
                      View Login History
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2 text-destructive">
                  <LogOut className="h-5 w-5" />
                  Account Sessions
                </h3>
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Device</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Current Device (Chrome)</TableCell>
                        <TableCell>New York, US</TableCell>
                        <TableCell>Now</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" disabled>Current</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">iPhone 13</TableCell>
                        <TableCell>New York, US</TableCell>
                        <TableCell>2 days ago</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Sign Out</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <div className="pt-2">
                    <Button variant="destructive" size="sm">Sign Out All Other Devices</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => navigate("/settings")}>Cancel</Button>
                <Button onClick={() => handleSaveSettings("Security")}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations & API</CardTitle>
              <CardDescription>Connect with other services and manage API access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Slack className="h-5 w-5" />
                  Third-Party Services
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg border p-4 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Slack className="h-8 w-8" />
                        <div>
                          <h4 className="text-base font-medium">Slack</h4>
                          <p className="text-sm text-muted-foreground">Receive alerts in your Slack workspace</p>
                        </div>
                      </div>
                      <Switch id="slack-integration" />
                    </div>
                    <div className="space-y-2 mt-auto">
                      <Input placeholder="Slack Webhook URL" disabled={true} />
                      <Button variant="outline" size="sm" className="w-full" disabled={true}>
                        Configure Slack
                      </Button>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Github className="h-8 w-8" />
                        <div>
                          <h4 className="text-base font-medium">GitHub</h4>
                          <p className="text-sm text-muted-foreground">Connect to your GitHub repositories</p>
                        </div>
                      </div>
                      <Switch id="github-integration" />
                    </div>
                    <div className="space-y-2 mt-auto">
                      <Input placeholder="Repository path" disabled={true} />
                      <Button variant="outline" size="sm" className="w-full" disabled={true}>
                        Connect GitHub
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Access
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-api">Enable API Access</Label>
                      <p className="text-sm text-muted-foreground">Allow external applications to use our API</p>
                    </div>
                    <Switch id="enable-api" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="api-key">API Key</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Show API Key</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input id="api-key" type="password" value="••••••••••••••••••••••••••••••" readOnly disabled />
                  </div>
                  
                  <div className="pt-2 space-x-2">
                    <Button variant="outline" className="w-auto" disabled>
                      Generate New API Key
                    </Button>
                    <Button variant="outline" className="w-auto" disabled>
                      View API Documentation
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Data Export & Import
                </h3>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Export Data</Label>
                      <p className="text-sm text-muted-foreground">Download your data in various formats</p>
                      <div className="flex items-center gap-2 pt-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export CSV
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Export PDF
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Import Data</Label>
                      <p className="text-sm text-muted-foreground">Upload and import data from other sources</p>
                      <div className="pt-2">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Import Data
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => navigate("/settings")}>Cancel</Button>
                <Button onClick={() => handleSaveSettings("Integration")}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Settings;
