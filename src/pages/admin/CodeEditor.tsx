import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Terminal } from '@/components/ui/terminal';
import { Button } from '@/components/ui/button';
import { Download, File, Folder } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminCodeEditor = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState('index.tsx');
  const [fileContent, setFileContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editorType, setEditorType] = useState<'custom' | 'vscode'>('custom');

  const fileTree = [
    { name: 'src', type: 'folder', children: [
      { name: 'components', type: 'folder' },
      { name: 'pages', type: 'folder' },
      { name: 'App.tsx', type: 'file' },
      { name: 'index.tsx', type: 'file' },
    ]},
    { name: 'public', type: 'folder' },
    { name: 'package.json', type: 'file' },
  ];

  useEffect(() => {
    // Simulate loading file content from Supabase
    setFileContent(`// ${selectedFile}\n\nconsole.log('Hello from ${selectedFile}');`);
    setEditMode(false);
  }, [selectedFile]);

  const handleExport = () => {
    toast({
      title: 'Export Started',
      description: 'Your project will be downloaded as a ZIP file.',
    });
  };

  const FileTreeItem = ({ item, level = 0 }: any) => (
    <div style={{ paddingLeft: `${level * 1}rem` }}>
      <div 
        className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-muted ${
          selectedFile === item.name ? 'bg-muted' : ''
        }`}
        onClick={() => item.type === 'file' && setSelectedFile(item.name)}
      >
        {item.type === 'folder' ? (
          <Folder className="h-4 w-4 text-primary" />
        ) : (
          <File className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="text-sm">{item.name}</span>
      </div>
      {item.children && item.children.map((child: any) => (
        <FileTreeItem key={child.name} item={child} level={level + 1} />
      ))}
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Code Editor</h1>
            <p className="text-muted-foreground">
              View and manage project files
            </p>
          </div>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export as ZIP
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-16rem)]">
          {/* File Tree */}
          <Card className="p-4 overflow-y-auto">
            <h3 className="font-semibold mb-3 text-sm">Project Files</h3>
            <div className="space-y-1">
              {fileTree.map((item) => (
                <FileTreeItem key={item.name} item={item} />
              ))}
            </div>
          </Card>

          {/* Code Editor with toggle */}
          <Card className="lg:col-span-3 overflow-hidden flex flex-col">
            <div className="border-b border-border p-3 bg-muted/30 flex items-center gap-2">
              <File className="h-4 w-4" />
              <span className="font-mono text-sm">{selectedFile}</span>
              <Button size="sm" variant={editorType === 'custom' ? 'default' : 'outline'} onClick={() => setEditorType('custom')} className="ml-auto">
                Custom Editor
              </Button>
              <Button size="sm" variant={editorType === 'vscode' ? 'default' : 'outline'} onClick={() => setEditorType('vscode')}>
                VSCode.dev
              </Button>
              {editorType === 'custom' && (
                <Button size="sm" variant="outline" onClick={() => setEditMode((e) => !e)}>
                  {editMode ? 'View' : 'Edit'}
                </Button>
              )}
            </div>
            <div className="flex-1 overflow-auto p-4">
              {editorType === 'custom' ? (
                editMode ? (
                  <textarea
                    className="font-mono text-sm w-full h-64 rounded border p-2"
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                  />
                ) : (
                  <pre className="font-mono text-sm">
                    <code>{fileContent}</code>
                  </pre>
                )
              ) : (
                <iframe
                  src="https://vscode.dev/"
                  title="VSCode.dev"
                  className="w-full h-96 border rounded"
                  style={{ minHeight: '400px' }}
                />
              )}
            </div>
            {editorType === 'custom' && editMode && (
              <div className="p-3 border-t border-border flex justify-end">
                <Button size="sm" onClick={() => setEditMode(false)}>
                  Save
                </Button>
              </div>
            )}
          </Card>
        </div>

        <Card className="p-4 bg-muted/30">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This is a demo code editor. Saving will update the local state only. For real file sync, connect to Supabase or your backend.
          </p>
        </Card>

        <div className="mt-8">
          <h3 className="font-semibold mb-3 text-sm">Terminal</h3>
          <Terminal />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCodeEditor;
